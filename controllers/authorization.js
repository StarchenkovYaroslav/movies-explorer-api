const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { CREATED_STATUS, OK_STATUS } = require('../utils/constants');

const { JWT_SECRET } = require('../utils/configs/app-config');

const BadRequestError = require('../utils/errors/bad-request-error');
const DuplicateError = require('../utils/errors/duplicate-error');

module.exports.signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name, email, password: hashedPassword,
    }))
    .then(() => {
      res.status(CREATED_STATUS).send({ message: 'пользователь успешно создан' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(err.message));
        return;
      }

      if (err.code === 11000) {
        next(new DuplicateError(err.message));
        return;
      }

      next(err);
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res
        .status(200)
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .status(OK_STATUS)
        .send({ message: 'вход выполнен' });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res
    .status(200)
    .clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .send({ message: 'осуществлен выход из системы' });
};