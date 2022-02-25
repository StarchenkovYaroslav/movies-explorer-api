const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../utils/errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 2,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email })
  .select('+password')
  .orFail(new UnauthorizedError('пользователь с таким email не найден'))
  .then((user) => bcrypt.compare(password, user.password)
    .then((isPasswordMatched) => {
      if (!isPasswordMatched) {
        return Promise.reject(new UnauthorizedError('неверный пароль'));
      }

      return user;
    }));

userSchema.set('toJSON', {
  transform(doc, ret) {
    const result = { ...ret };
    delete result.password;
    return result;
  },
});

module.exports = mongoose.model('user', userSchema);
