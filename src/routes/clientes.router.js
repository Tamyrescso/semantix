const express = require('express');
const clientesController = require('../controllers/clientes.controller');

const clientesRouter = express.Router();

clientesRouter.get('/', clientesController.list);

module.exports = clientesRouter;
