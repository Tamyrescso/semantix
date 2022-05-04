const { Clientes } = require('../models');
const validateClient = require('./validations/clientes.validation');

const list = async () => {
  const clients = await Clientes.findAll();

  return { code: 200, data: clients };
};

const create =  async (nome, email, telefone) => {
  const error = validateClient(nome, email, telefone);
  if (error) return { code: 400, data: { message: error } };

  const alreadyExists = await Clientes.findOne({ where: { email } });
  if (alreadyExists) return { code: 409, data: { message: 'Client already registered' } };

  const newClient = await Clientes.create({nome, email, telefone});

  return { code: 201, data: newClient };
};

const update = async (nome, email, telefone, id) => {
  const error = validateClient(nome, email, telefone);
  if (error) return { code: 400, data: { message: error } };

  await Clientes.update({ nome, email, telefone }, { where: { id } });

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
