// IMPORTS
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const { apiLimiter } = require('./utils/rateLimit');
console.log(process.env.MONGO_SERVER);

// create a server
const app = express();

// specify port
const { PORT = 3000 } = process.env;

// APP USE -------------------------------------------->
app.use(helmet());

app.use(apiLimiter);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

// CODE FOR SERVER CRASH TESTING - TODO REMOVE AFTER PROJECT IS ACCEPTED !!!
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// connecting router
app.use(router);

app.use(errors());
app.use(errorHandler);

// mongoose.connect('mongodb://localhost:27017/aroundb', {
//   useNewUrlParser: true,
//   // useCreateIndex: false,
//   // useFindAndModify: false,
// });

//connect port
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
