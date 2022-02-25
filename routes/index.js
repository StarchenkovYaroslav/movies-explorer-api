const commonRouter = require('express').Router();

const authRouter = require('./authorization');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const authProtector = require('../utils/middlewares/authProtector');

const { signOut, checkAuth } = require('../controllers/authorization');

commonRouter.get('/checkAuth', checkAuth);

commonRouter.use('/', authRouter);

commonRouter.use(authProtector);

commonRouter.use('/users', usersRouter);
commonRouter.use('/movies', moviesRouter);

commonRouter.get('/logout', signOut);

module.exports = commonRouter;
