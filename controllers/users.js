const User = require('../models/user');

const NotFoundError = require('../utils/errors/not-found-error');
const BadRequestError = require('../utils/errors/bad-request-error');
const DuplicateError = require('../utils/errors/duplicate-error');

const { OK_STATUS } = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('пользователь не найден'))
    .then((user) => {
      res.status(OK_STATUS).send(user);
    })
    .catch(next);
};

module.exports.editCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, ...req.body, {
    new: true,
  })
    .orFail(new NotFoundError('пользователь не найден'))
    .then((user) => {
      res.status(OK_STATUS).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateError(err.message));
        return;
      }

      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(err.message));
        return;
      }

      next(err);
    });
};
