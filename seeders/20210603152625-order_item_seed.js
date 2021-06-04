'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderItems', [
      {
        OrderId: 1,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        OrderId: 2,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};

