'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Saves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Pins, {
        targetKey: 'pinId',
        foreignKey: 'pinId',
        onDelete: 'CASCADE',
      });
    }
  }

  Saves.init(
    {
      saveId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      pinId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Pins',
          key: 'pinId',
        },
        onDelete: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Saves',
      timestamps: false ,
    }
  );

  return Saves;
};