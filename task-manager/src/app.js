const express = require('express');

if (process.env.NODE_ENV !== 'development' & process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

require('./db/mongoose');

const app = express();

app.use(express.json());

app.use(require('./routers'));

module.exports = app;
