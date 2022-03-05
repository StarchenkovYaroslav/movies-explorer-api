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
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError('неверная почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((isPasswordMatched) => {
        if (!isPasswordMatched) {
          return Promise.reject(new UnauthorizedError('неверная почта или пароль'));
        }

        return user;
      }));
}

userSchema.set('toJSON', {
  transform(doc, ret) {
    const result = { ...ret };
    delete result.password;
    return result;
  },
});

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
