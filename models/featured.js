'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class featured extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { program }) {
      featured.hasOne(program, {
        foreignKey: 'program_id',
        as: 'program'
      })
    }
  }
  featured.init({
    featured_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    program_id:{
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'featured',
    tableName: 'featured',
    timestamps: true,
    createdAt: true,
    updatedAt: false
  });
  return featured;
};