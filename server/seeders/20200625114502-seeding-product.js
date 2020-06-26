'use strict';

const seeds = require('../files/datas.json')
seeds.forEach(seed => {
  seed.createdAt = new Date(),
  seed.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', seeds, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
