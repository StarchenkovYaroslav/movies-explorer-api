const commonRouter = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

commonRouter.use('/users', usersRouter);
commonRouter.use('/movies', moviesRouter);

module.exports = commonRouter;
