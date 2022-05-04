const { Compras, Clientes, ComprasProdutos, Produtos, sequelize } = require('../models');
const { validateOrder,
  ifProductsExist,
  ifClientExist,
  ifOrderExist } = require('./validations/compras.validation');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const list = async () => {
  const orders = await Compras.findAll({
    attributes: { exclude: ['clienteId'] },
    include: [
      {
        model: Clientes,
        as: 'cliente'
      },
      {
        model: Produtos,
        as:'produtos',
        attributes: { exclude: ['quantidadeEstoque'] },
        through: {
          attributes: { exclude: ['comprasId', 'produtosId'] },
      },
    },
  ]
  });
  return { code: 200, data: orders };
};

const listByClient = async (id) => {
  const findById = await Compras.findAll({
    attributes: { exclude: ['clienteId'] },
    where : { clienteId: id },
    include: [
      {
        model: Clientes,
        as: 'cliente'
      },
      {
        model: Produtos,
        as:'produtos',
        attributes: { exclude: ['quantidadeEstoque'] },
        through: {
          attributes: { exclude: ['comprasId', 'produtosId'] },
      },
    },
  ]
  });

  return { code: 200, data: findById };
};

const listByClientAndDate = async (id, dateFormat, q) => {
  //código baseado no link https://stackoverflow.com/questions/55682902/node-js-sequelize-select-query-by-month
  const orders = await Compras.findAll({
    attributes: { exclude: ['clienteId'] },
    where: {
      clienteId: id,
      [Op.and]: [
        sequelize.fn(`EXTRACT(${dateFormat} from "createdAt")=`, q)
      ]
    },
    include: [
      {
        model: Clientes,
        as: 'cliente'
      },
      {
        model: Produtos,
        as:'produtos',
        attributes: { exclude: ['quantidadeEstoque'] },
        through: {
          attributes: { exclude: ['comprasId', 'produtosId'] },
      },
    },
  ]
  });
  return { code: 200, data: orders };
}

const decrementInventory = async (produtoId, quantidade) => {
  await Produtos.decrement({'quantidadeEstoque': quantidade}, { where: { id: produtoId } })
};

const incrementInventory = async (produtoId, quantidade) => {
    await Produtos.increment({'quantidadeEstoque': quantidade}, { where: { id: produtoId } })
};

const updateInventory = async (compras, id) => {
  // procura a venda, quais os produtos e a quantidade vendida de cada um
  const orders = await findOrderById(id);
  // repõe os itens no estoque
  await Promise.all([...orders].map(({ produtosId, quantidade }) => incrementInventory(produtosId, quantidade)));
  // exclui relação de compras e produtos anterior de acordo com o id da compra
  await ComprasProdutos.destroy({ where: { id } });
  // retira do estoque as quantidades dos itens específicos enviados no update
  await Promise.all(compras.map(({ produtoId, quantidade }) => decrementInventory(produtoId, quantidade)));
};

const create =  async (clienteId, compras) => {
  const error = validateOrder(clienteId, compras, 'clienteId');
  if (error) return { code: 400, data: { message: error } };

  const clientDoesntExist = await ifClientExist(clienteId);
  if (clientDoesntExist) return clientDoesntExist;

  const productsDontExist = await ifProductsExist(compras);
  if (productsDontExist) return productsDontExist;

  // cria uma nova compra na tabela Compras obs.: data de compra é criada automaticamente
  const newOrder = await Compras.create({clienteId});
  // add os detalhes da compra na tabela CompraProdutos
  await Promise.all(compras.map(
    (order) => ComprasProdutos.create({ comprasId: newOrder.id, produtosId: order.produtoId, quantidade: order.quantidade })
  ))
  // atualiza o estoque diminuindo sua quantidade devido a atualização da compra
  await Promise.all(compras.map(({ produtoId, quantidade }) => decrementInventory(produtoId, quantidade)));

  return { code: 201, data: newOrder };
};

const update = async (id, clienteId, compras) => {
  const error = validateOrder(parseInt(id,10), compras, 'compraId');
  if (error) return { code: 400, data: { message: error } };

  const orderDoesntExist = await ifOrderExist(id);
  if (orderDoesntExist) return orderDoesntExist;

  const clientDoesntExist = await ifClientExist(clienteId);
  if (clientDoesntExist) return clientDoesntExist;

  const productsDontExist = await ifProductsExist(compras);
  if (productsDontExist) return productsDontExist;

  // atualiza os valores de estoque quando há uma atualização na compra
  await updateInventory(compras, id);
  // atualiza a compra
  await Compras.update({ clienteId }, { where: { id } });
  // cria nova relação de produto e quantidade usando o mesmo id de compra
  await Promise.all(compras.map(
    (order) => ComprasProdutos.create({ comprasId: id, produtosId: order.produtoId, quantidade: order.quantidade })
  ))

  const updated = await Compras.findByPk(id);
  return { code: 200, data: updated };
};

const findOrderById = async (id) => {
  const orders = await ComprasProdutos.findAll({ where: { comprasId: id } });
  return orders;
}

const destroy = async (id) => {
  // procura a venda, quais os produtos e a quantidade vendida de cada um
  const orders = await findOrderById(id);
  // aumenta o estoque por causa da exclusão da venda
  await Promise.all([...orders].map(({ produtosId, quantidade }) => incrementInventory(produtosId, quantidade)));
  // exclui a venda
  await Compras.destroy({ where: { id } });

  return { code: 204 };
};

module.exports = {
  list,
  listByClient,
  listByClientAndDate,
  create,
  update,
  destroy,
};
