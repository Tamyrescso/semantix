const comprasService = require('../services/compras.service');

const list = async (_req, res, next) => {
  try {
    const { code, data } = await comprasService.list();
  
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const listByClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.query.q) {
      const { code, data } = await comprasService.listByClient(id);
      return res.status(code).json(data);
    }
    
    const { dateFormat } = req.params;
    const { q } = req.query;
    const { code, data } = await comprasService.listByClientAndDate(id, dateFormat, q);
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { clienteId, compras } = req.body;
    const { code, data } = await comprasService.create(clienteId, compras);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clienteId, compras } = req.body;

    const { code, data } = await comprasService.update(id, clienteId, compras);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { code } = await comprasService.destroy(id);

  return res.status(code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  list,
  listByClient,
  create,
  update,
  destroy
};
