const clientesService = require('../services/clientes.service');

const list = async (_req, res, next) => {
  try {
    const { code, data } = await clientesService.list();
  
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { nome, email } = req.body;
    const { code, data } = await clientesService.create(nome, email);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const { code, data } = await clientesService.update(nome, email, id);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { code } = await clientesService.destroy(id);

  return res.status(code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  list,
  create,
  update,
  destroy
}