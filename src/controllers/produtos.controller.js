const produtosService = require('../services/produtos.service');

const list = async (_req, res, next) => {
  try {
    const { code, data } = await produtosService.list();
  
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { nome, quantidadeEstoque, preço } = req.body;
    const { code, data } = await produtosService.create(nome, quantidadeEstoque, preço);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, quantidadeEstoque, preço } = req.body;

    const { code, data } = await produtosService.update(nome, quantidadeEstoque, preço, id);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { code } = await produtosService.destroy(id);

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