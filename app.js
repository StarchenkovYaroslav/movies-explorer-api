require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const errorHandler = require('./utils/middlewares/handlers/error-handler');
const { errorLogger, requestLogger } = require('./utils/middlewares/logger');

const routs = require('./routes');

const { PORT, DB_ADDRESS } = require('./utils/configs/app-config');
const corsConfig = require('./utils/configs/cors-config');

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(routs);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
