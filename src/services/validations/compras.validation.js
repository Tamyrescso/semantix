const { Clientes, Produtos, Compras } = require('../../models');
const { genericNumberValidation, genericLengthValidation } = require('./generic.validation');

const validateOrder = (clienteId, compras, clienteOuCompra) => {
  const errorClient = genericNumberValidation(clienteId, clienteOuCompra);
  const errorOrder = genericLengthValidation(compras, 'compras');
  const errorProductsId = compras.map((o) => genericNumberValidation(o.produtoId, 'produtoId'));
  const errorQuantity = compras.map((o) => genericNumberValidation(o.quantidade, 'quantidade'));

  if (errorClient) return errorClient;
  if (errorOrder) return errorOrder;
  if (errorProductsId.some((e) => e)) return errorProductsId.find((e) => e);
  if (errorQuantity.some((e) => e)) return errorProductsId.find((e) => e);

  return null;
}

const ifClientExist = async (clienteId) => {
  const clientExists = await Clientes.findByPk(clienteId);
  if (!clientExists) return { code: 409, data: { message: "Client doesn't exist" } };

  return null;
};

const ifOrderExist = async (compraId) => {
  const orderExists = await Compras.findByPk(compraId);
  if (!orderExists) return { code: 409, data: { message: "Order doesn't exist" } };

  return null;
}

const ifProductsExist = async (compras) => {
  const productNotExist = await Promise.all(compras.map((order) => {
    return Produtos.findByPk(order.produtoId)
  }));

  if(productNotExist.some((product) => !product)) return { code: 409, data: { message: "Product doesn't exist" } }
}

module.exports = {
  validateOrder,
  ifClientExist,
  ifOrderExist,
  ifProductsExist,
}