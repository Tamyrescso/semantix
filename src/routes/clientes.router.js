const express = require('express');
const clientesController = require('../controllers/clientes.controller');

const clientesRouter = express.Router();

clientesRouter.get('/', clientesController.list);
clientesRouter.post('/', clientesController.create);
clientesRouter.put('/:id', clientesController.update);
clientesRouter.delete('/:id', clientesController.destroy);

module.exports = clientesRouter;
