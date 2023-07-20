'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class discussion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_data, program }) {
      discussion.belongsTo(user_data, {
        foreignKey: 'user_id',
        as: 'users'
      }),
      discussion.belongsTo(program, {
        foreignKey: 'program_id',
        as: 'programs'
      })
    }
  }
  discussion.init({
    discussion_id:{
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
    program_id:{
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'discussion',
    tableName: 'discussion',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  });
  return discussion;
};