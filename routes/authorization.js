const authRouter = require('express').Router();

const { signUp, signIn } = require('../controllers/authorization');

const { signUpValidator, signInValidator } = require('../utils/middlewares/validators/authorization');

authRouter.post('/sign-up', signUpValidator, signUp);
authRouter.post('/sign-in', signInValidator, signIn);

module.exports = authRouter;
