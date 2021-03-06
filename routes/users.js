const usersRouter = require('express').Router();

const { getCurrentUser, editCurrentUser } = require('../controllers/users');
const { editCurrentUserValidator } = require('../middlewares/validators/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', editCurrentUserValidator, editCurrentUser);

module.exports = usersRouter;
