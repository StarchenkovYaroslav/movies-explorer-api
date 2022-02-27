const { celebrate, Joi } = require('celebrate');

const { urlValidator } = require('../../utils/custom-validators');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().max(4),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().min(1).max(100),
    nameEn: Joi.string().required().min(1).max(100),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
