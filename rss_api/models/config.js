//imports
const { DataTypes } = require('sequelize');
const logger = require('../helpers/logger');
//const sequelize = new Sequelize('server=127.0.0.1;uid=root;pwd=example,database=testdb');
//
const userModel  = require('./user');
const sequelize = require('./connection');

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
      unique: 'compositeIndex',
    },
    feedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feedUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    }
  }
)

try {
  //userModel.User.sync({ force: true });
  //this.Config.sync({ force: true });
} catch(err) {
  logger.error('err', err);
}

exports.createConfig = async (configObject) => {
  return await this.Config.create(configObject);
}

exports.listConfig = async (userId) => {
  const configsModelArr = await this.Config.findAll({where: {userId: userId}});
  const configsArr = configsModelArr.map((eachConfig) => {
    return eachConfig.dataValues;
  });
  return configsArr;
}
