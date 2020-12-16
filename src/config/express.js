const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');

const { logs } = require('./vars');
const error = require('../middlewares/errorHandler');
const routes = require('../api');

const app = express();

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());

app.use(helmet());

app.use('/api', routes);

app.use(error.notFound);

app.use(error.handler);

exports.app = app;
