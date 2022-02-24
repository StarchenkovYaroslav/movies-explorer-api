const { BAD_REQUEST_STATUS } = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = 'BadRequestError';
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

module.exports = BadRequestError;
