'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_data, discussion, featured}) {
      program.belongsTo(user_data, {
        foreignKey: 'user_id',
        as: 'users'
      }),
      program.hasMany(discussion, {
        foreignKey: 'program_id',
        as: 'discussions'
      }),
      program.hasMany(featured, {
        foreignKey: 'program_id',
        as: 'featured'
      })
    }
  }
  program.init({
    program_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    binary:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'program',
    tableName: 'program',
    timestamps: false
  });
  return program;
};