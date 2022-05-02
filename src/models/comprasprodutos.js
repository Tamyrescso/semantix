module.exports = (sequelize) => {
  const ComprasProdutos = sequelize.define('ComprasProdutos', {},
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