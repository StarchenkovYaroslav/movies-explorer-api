const commonRouter = require('express').Router();

const authRouter = require('./authorization');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const authProtector = require('../utils/middlewares/authProtector');
const pageNotFoundHandler = require('../utils/middlewares/handlers/page-not-found-handler');

const { signOut, checkAuth } = require('../controllers/authorization');

commonRouter.get('/checkAuth', checkAuth);

commonRouter.use('/', authRouter);

commonRouter.use(authProtector);

commonRouter.use('/users', usersRouter);
commonRouter.use('/movies', moviesRouter);

commonRouter.get('/sign-out', signOut);

commonRouter.use(pageNotFoundHandler);

module.exports = commonRouter;
