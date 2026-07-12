//imports
const { DataTypes } = require('sequelize');
const logger = require('../helpers/logger');
const { sequelize } = require('../helpers/connection');
const userModel  = require('./user');

//functional
exports.Config = sequelize.define(
  'Config',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { 
      type: DataTypes.INTEGER,
      references: {
        model: userModel.User,
        key: 'id',
      },
    },
    feedName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex"
    },
    feedUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex"
    }
  }
)

try {
  //userModel.User.sync({ force: true });
  this.Config.sync({ force: true });
} catch(err) {
  logger.error('err', err);
}

exports.createConfig = async (configObject) => {
  return await this.Config.create(configObject);
}

exports.listConfigs = async(userId) => {
  return await this.Config.findAll({
    where: {
      userId: userId
    }
  });
}
