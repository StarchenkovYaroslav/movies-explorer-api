const cors = require('cors');

module.exports = cors({
  origin: 'https://moviesexplorer.nomoredomains.work',
  credentials: true,
});
