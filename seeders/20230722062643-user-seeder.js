'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
      [
        {
          username: 'admin',
          role: 'admin',
          password_digest: await bcrypt.hash(process.env.ADMIN_PASS, 10),
          createdAt: new Date()
        },
      ]      
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',
      {
        where: {
          role: 'admin'
        }
      }
    )
  }
};
