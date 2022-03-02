const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/bad-request-error');
const NotFoundError = require('../utils/errors/not-found-error');
const ForbiddenError = require('../utils/errors/forbidden-error');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError('фильм не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('нет прав на удаление');
      }

      return movie.remove();
    })
    .then(() => {
      res.send({ message: 'фильм успешно удален' });
    })
    .catch(next);
};
