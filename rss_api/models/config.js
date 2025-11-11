const { DataTypes } = require('sequelize');
//const sequelize = new Sequelize('server=127.0.0.1;uid=root;pwd=example,database=testdb');
//
const userModel  = require('./user');
const sequelize = require('./connection');
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
  this.Config.sync({ force: true });
} catch(err) {
  console.error('err', err);
}

exports.createConfig = async (configObject) => {
  return await this.Config.create(configObject);
}
