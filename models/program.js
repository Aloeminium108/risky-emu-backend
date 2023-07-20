'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, discussion, feature }) {
      program.belongsTo(user, {
        foreignKey: 'user_id',
        as: 'users'
      }),
      program.hasMany(discussion, {
        foreignKey: 'program_id',
        as: 'discussions'
      }),
      program.belongsTo(feature, {
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
      foreignKey: true,
      allowNull: false
    },
    text:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    binary:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
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
    tableName: 'programs',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  });
  return program;
};