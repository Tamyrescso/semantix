const express = require('express');
const comprasController = require('../controllers/compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/', comprasController.list);
comprasRouter.post('/', comprasController.create);
comprasRouter.put('/:id', comprasController.update);
comprasRouter.delete('/:id', comprasController.destroy);
comprasRouter.get('/cliente/:id', comprasController.listByClient);
comprasRouter.get('/cliente/:id/:dateFormat', comprasController.listByClient);

module.exports = comprasRouter;