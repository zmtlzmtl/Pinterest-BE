'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // this.belongsTo(models.Users, {
      //   targetKey: 'userId',
      //   foreignKey: 'UserId',
      //   onDelete: 'CASCADE',
      // });
      this.belongsTo(models.Pins, {
        targetKey: 'pinId',
        foreignKey: 'pinId',
        onDelete: 'CASCADE',
      });
    }
  }

  Comments.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pins',
          key: 'pinId',
        },
        onDelete: 'cascade',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};
