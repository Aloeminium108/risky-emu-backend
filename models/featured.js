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
      featured.belongsTo(program, {
        foreignKey: 'program_id',
        as: 'programs'
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
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'featured',
    tableName: 'featured',
    timestamps: false
  });
  return featured;
};