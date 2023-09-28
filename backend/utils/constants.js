// ERROR CONSTANTS

const ERROR_CODE = {
  NOT_FOUND: 404,
  INCORRECT_DATA: 400,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT_ERROR: 409,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGE = {
  NOT_FOUND: 'Sorry, the requested resource was not found',
  INTERNAL_SERVER_ERROR: 'Internal server error has occurred',
  INCORRECT_DATA: 'Incorrect data',
  CONFLICT: 'A user with this data already registered',
  BAD_REQUEST: 'This request cannot be fulfilled due to bad syntax',
  UNAUTHORIZED: 'Authorization required',
  FORBIDDEN: 'Sorry, you are not authorized to remove others card',
};

module.exports = {
  ERROR_CODE,
  ERROR_MESSAGE,
};
