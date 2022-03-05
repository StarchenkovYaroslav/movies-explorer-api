const NotFoundError = require('../../utils/errors/not-found-error');

module.exports = () => {
  throw new NotFoundError('страница не найдена');
};
