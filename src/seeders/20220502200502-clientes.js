module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Clientes',
    [{
      id: 1,
      nome: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
    },
    {
      id: 2,
      nome: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
    },
  ], { timestamps: false });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};
