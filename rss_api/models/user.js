const { DataTypes } = require('sequelize');
//const sequelize = new Sequelize('server=127.0.0.1;uid=root;pwd=example,database=testdb');
const crypto = require('crypto');
const logger = require('../helpers/logger');

const sequelize = require('./connection');
exports.User = sequelize.define(
  'User',
  {
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
)

exports.createUser = async (userObject) => {
  userObject.salt = crypto.randomBytes(16).toString('hex');
  userObject.password = crypto.pbkdf2Sync(userObject.password, userObject.salt, 1000, 64, 'sha512').toString('hex');
  const createdUser = await this.User.create(userObject);
  return createdUser;
}

exports.setPassword = async (userObject) => {
    userObject.password = crypto.pbkdf2Sync(userObject.password, userObject.salt, 1000, 64, 'sha512').toString('hex');
  const currentUser = await this.User.update(userObject, { where: { id: userObject.id } });
  return currentUser;
}

exports.getUserByEmailId = async(emailId) => {
  return await this.User.findOne({ where: { email: emailId } });
}

exports.getUserById = async(userId) => {
  return await this.User.findOne({ where: { id: userId } });
}

