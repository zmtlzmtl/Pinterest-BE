'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'PinsTags',
      {
        pinId: {
          type: Sequelize.INTEGER,
        },
        tagId: {
          type: Sequelize.INTEGER,
        },
      },
      { timestamp: false }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PinsTags');
  },
};
