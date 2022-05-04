const express = require('express');
const comprasController = require('../controllers/compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/', comprasController.list);
comprasRouter.get('/:id', comprasController.listByClient);
comprasRouter.get('/:id/:dateFomat', comprasController.listByClient);
comprasRouter.post('/', comprasController.create);
comprasRouter.put('/:id', comprasController.update);
comprasRouter.delete('/:id', comprasController.destroy);

module.exports = comprasRouter;