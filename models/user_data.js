'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ program, discussion }) {
      user_data.hasMany(program, {
        foreignKey: 'user_id',
        as: 'programs'
      }),
      user_data.hasMany(discussion, {
        foreignKey: 'user_id',
        as: 'discussions'
      })
    }
  }
  user_data.init({
    user_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username:{
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    hash:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user_data',
    tableName: 'user_data',
    timestamps: false
  });
  return user_data;
};