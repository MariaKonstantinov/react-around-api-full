// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// helmet middleware to set security headers for API
const helmet = require('helmet');

// error handling
const { ERROR_CODE, ERROR_MESSAGE } = require('./utils/constants');

// connect routers
const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

// rate-limit to limit the number of requests to protect the recourse against DoS attacks
const { apiLimiter } = require('./utils/rateLimit');

// create a server
const app = express();

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  // useCreateIndex: false,
  // useFindAndModify: false,
});

// specify port
const { PORT = 3000 } = process.env;

// APP USE -------------------------------------------->
app.use(helmet());

app.use(bodyParser.json());

app.use(apiLimiter);

// temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: '64cbc5c7be3cf4a6940b524a', // the _id of the test user
  };

  next();
});

// routers
app.use(usersRouter);

app.use(cardsRouter);

// middleware for handling an unknown route
app.use((req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: ERROR_MESSAGE.NOT_FOUND });
});

// error handling
app.use((error, req, res, next) => {
  if (error.status !== ERROR_CODE.INTERNAL_SERVER_ERROR) {
    res.status(error.status).send({ message: error.message });
    return;
  }
  res
    .status(error.status)
    .send({ message: `${ERROR_MESSAGE.INTERNAL_SERVER_ERROR}` });
  next();
});

// connect port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
