const { Clientes } = require('../models');
const validateClient = require('./schema/clientes.validation');

const list = async () => {
  const clients = await Clientes.findAll();

  return { code: 200, data: clients };
};

const create =  async (nome, email) => {
  const error = validateClient(nome, email);
  if (error) return { code: 400, data: { message: error } };

  const alreadyExists = await Clientes.findOne({ where: { email } });
  if (alreadyExists) return { code: 409, data: { message: 'Client already registered' } };

  console.log(error, alreadyExists)
  const newClient = await Clientes.create({nome, email});

  return { code: 201, data: newClient };
};

const update = async (nome, email, id) => {
  const error = validateClient(nome, email);
  if (error) return { code: 400, data: { message: error } };

  await Clientes.update({ nome, email }, { where: { id } });

  const updated = await Clientes.findByPk(id);

  return { code: 200, data: updated };
};

const destroy = async (id) => {
  await Clientes.destroy({ where: { id } });

  return { code: 204 };
};

module.exports = {
  list,
  create,
  update,
  destroy,
};
