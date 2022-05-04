module.exports = (sequelize, DataTypes) => {
  const ComprasProdutos = sequelize.define('ComprasProdutos', {
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      underscored: false,
      timestamps: false,
      modelName: 'ComprasProdutos'
    });

  ComprasProdutos.associate = (models) => {
    models.Compras.belongsToMany(
      models.Produtos,
      { foreignKey: 'comprasId', otherKey: 'produtosId', through: ComprasProdutos, as: 'produtos'},
    )
    models.Produtos.belongsToMany(
      models.Compras,
      { foreignKey: 'produtosId', otherKey: 'comprasId', through: ComprasProdutos, as: 'compras' },
    )
  };

  return ComprasProdutos;
};