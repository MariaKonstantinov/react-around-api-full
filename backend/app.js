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

const { requestLogger, errorLogger } = require('./middleware/logger');

const { apiLimiter } = require('./utils/rateLimit');

const { DEF_MONGO_SERVER } = require('./utils/constants');

// create a server
const app = express();

const PORT = 3001;

// APP USE -------------------------------------------->
app.use(helmet());

app.use(apiLimiter);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

// CODE FOR SERVER CRASH TESTING - TODO REMOVE AFTER PROJECT IS ACCEPTED !!!
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// connecting router
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose
  .connect(
    process.env.MONGO_SERVER ? process.env.MONGO_SERVER : DEF_MONGO_SERVER
  )
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
