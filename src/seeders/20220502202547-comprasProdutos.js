module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('ComprasProdutos',
      [
        {
          comprasId: 1,
          produtosId: 2,
          quantidade: 10,
        },
        {
          comprasId: 1,
          produtosId: 3,
          quantidade: 5,
        },
        {
          comprasId: 2,
          produtosId: 1,
          quantidade: 2,
        },
        {
          comprasId: 3,
          produtosId: 2,
          quantidade: 5,
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('ComprasProdutos', null, {});
  },
};
