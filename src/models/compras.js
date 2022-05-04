const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updatedAt: {
    type: "TIMESTAMP",
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
}
module.exports = (sequelize) => {
  const Compras = sequelize.define(
    'Compras',
    Attributes,
    {
      modelName: 'Compras',
      timestamps: true,
      underscored: false,
    }
  );

  Compras.associate = (models) => {
    Compras.belongsTo(models.Clientes, { foreignKey: 'clienteId', as: 'cliente' });
  };
  return Compras;
};