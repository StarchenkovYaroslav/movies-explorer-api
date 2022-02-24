const validator = require('validator');

const BadRequestErrror = require('./errors/bad-request-error');

module.exports.urlValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestErrror('некорректный email');
  }

  return value;
};
