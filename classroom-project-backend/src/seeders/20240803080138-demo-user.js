'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'testuser1',
        password: hash,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'testuser2',
        password: hash,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};