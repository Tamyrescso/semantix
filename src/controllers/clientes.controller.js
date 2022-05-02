const clientesService = require('../services/clientes.service');

const list = async (_req, res, next) => {
  try {
    const { code, data } = await clientesService.list();
  
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  list,
}