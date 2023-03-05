'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PinsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pins, {
        targetKey: 'pinId',
        foreignKey: 'pinId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Tags, {
        targetKey: 'tagId',
        foreignKey: 'tagId',
        onDelete: 'CASCADE',
      });
    }
  }
  PinsTags.init(
    {
      pinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pins',
          key: 'pinId',
        },
        onDelete: 'CASCADE',
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'tagId',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'PinsTags',
      timestamp: false,
    }
  );
  return PinsTags;
};
