const commonRouter = require('express').Router();

const authRouter = require('./authorization');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { logOut } = require('../controllers/authorization');

commonRouter.use('/', authRouter);

commonRouter.use('/users', usersRouter);
commonRouter.use('/movies', moviesRouter);

commonRouter.get('/logout', logOut);

module.exports = commonRouter;
