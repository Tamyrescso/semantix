const express = require('express');
const produtosController = require('../controllers/produtos.controller');

const produtosRouter = express.Router();

produtosRouter.get('/', produtosController.list);
produtosRouter.post('/', produtosController.create);
produtosRouter.put('/:id', produtosController.update);
produtosRouter.delete('/:id', produtosController.destroy);

module.exports = produtosRouter;