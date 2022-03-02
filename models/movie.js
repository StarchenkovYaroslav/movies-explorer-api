const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  director: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    maxLength: 4,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 1000,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'некорректный путь к изображению',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'некорректный путь к трейлеру',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'некорректный путь к изображению',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  nameEN: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
});

movieSchema.post('save', (doc, next) => {
  doc.populate(['owner'])
    .then(() => {
      next();
    })
    .catch(next);
});

module.exports = mongoose.model('movie', movieSchema);
