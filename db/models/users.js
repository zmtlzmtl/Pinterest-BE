'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
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

  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      timestamps: false ,
    }
  );
  
  return Users;
};
