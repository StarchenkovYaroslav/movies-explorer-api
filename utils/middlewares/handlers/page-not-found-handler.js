const NotFoundError = require('../../errors/not-found-error');

module.exports = () => {
  throw new NotFoundError('страница не найдена');
};
