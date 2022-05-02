const { Clientes } = require('../models');

const list = async () => {
  const clients = await Clientes.findAll();

  return { code: 200, data: clients };
};

module.exports = {
  list,
}