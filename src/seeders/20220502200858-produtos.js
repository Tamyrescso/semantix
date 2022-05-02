module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Produtos',
    [{
      id: 1,
      nome: 'Martelo do Thor',
      quantidadeEstoque: '10',
      preço: '500.00'
    },
    {
      id: 2,
      nome: 'Traje de encolhimento',
      quantidadeEstoque: '20',
      preço: '300.00'
    },
    {
      id: 3,
      nome: 'Escudo do Capitão América',
      quantidadeEstoque: '30',
      preço: '400.00'
    },
  ], { timestamps: false });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Produtos', null, {});
  }
};
