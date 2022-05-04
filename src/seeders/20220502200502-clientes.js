module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Clientes',
    [{
      id: 1,
      nome: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      telefone: '(45)95876-5434'
    },
    {
      id: 2,
      nome: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
      telefone: '(24)2345-9485'
    },
  ], { timestamps: false });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};
