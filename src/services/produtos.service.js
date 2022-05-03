const { Produtos } = require('../models');
const validateProduct = require('./validations/produtos.validation');

const list = async () => {
  const products = await Produtos.findAll();

  return { code: 200, data: products };
};

const create =  async (nome, quantidadeEstoque, preço) => {
  const error = validateProduct(nome, quantidadeEstoque, preço);
  if (error) return { code: 400, data: { message: error } };

  const alreadyExists = await Produtos.findOne({ where: { nome } });
  if (alreadyExists) return { code: 409, data: { message: 'Product already registered' } };

  
  const newProduct = await Produtos.create({nome, quantidadeEstoque, preço});

  return { code: 201, data: newProduct };
};

const update = async (nome, quantidadeEstoque, preço, id) => {
  const error = validateProduct(nome, quantidadeEstoque, preço);
  if (error) return { code: 400, data: { message: error } };

  await Produtos.update({ nome, quantidadeEstoque, preço }, { where: { id } });

  const updated = await Produtos.findByPk(id);

  return { code: 200, data: updated };
};

const destroy = async (id) => {
  await Produtos.destroy({ where: { id } });

  return { code: 204 };
};

module.exports = {
  list,
  create,
  update,
  destroy,
};
