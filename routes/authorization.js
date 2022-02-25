const authRouter = require('express').Router();

const { signUp, signIn } = require('../controllers/authorization');

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);

module.exports = authRouter;
