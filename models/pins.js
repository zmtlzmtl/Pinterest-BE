'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Pins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   this.belongsTo(models.Users, {
    //     targetKey: 'userId',
    //     foreignKey: 'UserId',
    //     onDelete: 'CASCADE',
    //   });
    //   this.belongsTo(models.Posts, {
    //     targetKey: 'postId',
    //     foreignKey: 'PostId',
    //     onDelete: 'CASCADE',
    //   });
    // }
  }

  Pins.init(
    {
      pinId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Users',
        //   key: 'userId',
        // },
        // onDelete: 'cascade',
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashtags: {
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
      modelName: 'Pins',
    }
  );
  return Pins;
};
