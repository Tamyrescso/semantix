'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Compras',
    [{
      id: 1,
      clienteId: 1,
      createdAt: new Date('2011-08-01T19:58:00.000Z'),
      updatedAt: new Date('2011-08-01T19:58:00.000Z'),
    },
    {
      id: 2,
      clienteId: 2,
      createdAt: new Date('2011-04-01T19:58:00.000Z'),
      updatedAt: new Date('2011-04-01T19:58:00.000Z'),
    },
    {
      id: 3,
      clienteId: 1,
      createdAt: new Date('2010-03-01T19:58:00.000Z'),
      updatedAt: new Date('2010-03-01T19:58:00.000Z'),
    },
  ], { timestamps: true});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Compras', null, {});
  }
};