'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let products = [
      {
        name: 'Satin Blue'
      },
      {
        name: 'Chiffon Grey'
      },
      {
        name: 'Rayon Black'
      },
      {
        name: 'Satin Black'
      },
      {
        name: 'Rayon Grey'
      }
    ]

    products.forEach(product => {
      product.createdAt = new Date()
      product.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
