'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ program, discussion }) {
      user.hasMany(program, {
        foreignKey: 'user_id',
        as: 'programs'
      }),
      user.hasMany(discussion, {
        foreignKey: 'user_id',
        as: 'discussions'
      })
    }
  }
  user.init({
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
    password_digest:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(
        'admin',
        'guest'
      ),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    createdAt: true,
    updatedAt: false
  });
  return user;
};