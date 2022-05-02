'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ComprasProdutos', {
      comprasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Compras',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      produtosId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Produtos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('ComprasProdutos');
  }
};