const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidadeEstoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preço: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
}
module.exports = (sequelize) => {
  const Produtos = sequelize.define(
    'Produtos',
    Attributes,
    {
      modelName: 'Produtos',
      timestamps: false,
      underscored: false,
    }
  );
  return Produtos;
};