'use strict';
module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pins', {
      pinId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Users',
        //   key: 'userId',
        // },
        // onDelete: 'cascade',
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hashtags: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pins');
  },
};
