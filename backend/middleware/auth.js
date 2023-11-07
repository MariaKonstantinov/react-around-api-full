const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');
const { ERROR_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  console.log(`token ${token}`);
  console.log(`JWT_SECRET! ${JWT_SECRET}`);

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-tool'
    );
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  console.log(payload);

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};

module.exports = auth;
