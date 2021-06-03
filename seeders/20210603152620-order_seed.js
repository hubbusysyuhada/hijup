'use strict';
const { token } = require('../helpers/generateToken')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let temp = []
    for (let i = 0; i < 4; i++) {
      temp.push({
        code: token(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Orders', temp, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
