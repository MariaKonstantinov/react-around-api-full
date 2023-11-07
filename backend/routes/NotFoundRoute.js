const notFoundRouter = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_MESSAGE } = require('../utils/constants');

notFoundRouter.all('/', (req, res, next) => {
  console.log('Kuku');
  console.log(req.baseUrl);
  next(new NotFoundError(ERROR_MESSAGE.NOT_FOUND));
});

module.exports = notFoundRouter;
