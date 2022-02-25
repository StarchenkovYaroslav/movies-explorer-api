const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../configs/app-config');

function authProtector(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('токен не прошел проверку');
  }

  req.user = payload;

  next();
}

module.exports = authProtector;
