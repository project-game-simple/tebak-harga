'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Room);
    }
  };
  User.init({
    name: DataTypes.STRING,
    score: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.score = 0
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};