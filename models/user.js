const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
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

userSchema.set('toJSON', {
  transform(doc, ret) {
    const result = { ...ret };
    delete result.password;
    return result;
  },
});

module.exports = mongoose.model('user', userSchema);
