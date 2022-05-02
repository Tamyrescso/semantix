const express = require('express');
const errorMiddleware = require('./middleware/error.handler');

const app = express();

app.use(express.json());


app.use(errorMiddleware);

module.exports = app;

