const authRouter = require('express').Router();

const { signUp, signIn } = require('../controllers/authorization');

const { signUpValidator, signInValidator } = require('../middlewares/validators/authorization');

authRouter.post('/signup', signUpValidator, signUp);
authRouter.post('/signin', signInValidator, signIn);

module.exports = authRouter;
