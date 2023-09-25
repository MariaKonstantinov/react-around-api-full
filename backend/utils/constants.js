// ERROR CONSTANTS

const ERROR_CODE = {
  NOT_FOUND: 404,
  INCORRECT_DATA: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGE = {
  NOT_FOUND: 'Sorry, the requested resource was not found',
  INTERNAL_SERVER_ERROR: 'Internal server error has occurred',
  INCORRECT_DATA: 'Incorrect data',
};

module.exports = {
  ERROR_CODE,
  ERROR_MESSAGE,
};
