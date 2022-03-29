const moviesRouter = require('express').Router();

const { getUsersMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validators/movies');

moviesRouter.get('/', getUsersMovies);
moviesRouter.post('/', createMovieValidator, createMovie);

moviesRouter.delete('/:_id', deleteMovieValidator, deleteMovie);

module.exports = moviesRouter;
