const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}
module.exports = (sequelize) => {
  const Clientes = sequelize.define(
    'Clientes',
    Attributes,
    {
      modelName: 'Clientes',
      timestamps: false,
      underscored: false,
    }
  );

  Clientes.associate = (models) => {
    Clientes.hasMany(models.Compras, { foreignKey: 'clienteId', as: 'compra' });
  };
  return Clientes;
};
