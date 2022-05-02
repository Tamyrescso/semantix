const { DataTypes } = require('sequelize');

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
  dataCompra: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}
module.exports = (sequelize) => {
  const Compras = sequelize.define(
    'Compras',
    Attributes,
    {
      modelName: 'Compras',
      timestamps: false,
      underscored: false,
    }
  );

  Compras.associate = (models) => {
    Compras.belongsTo(models.Clientes, { foreignKey: 'clienteId', as: 'cliente' });
  };
  return Compras;
};