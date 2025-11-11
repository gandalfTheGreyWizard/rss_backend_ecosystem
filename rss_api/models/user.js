const { DataTypes } = require('sequelize');
//const sequelize = new Sequelize('server=127.0.0.1;uid=root;pwd=example,database=testdb');
//
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
    }
  }
)

//try {
  //User.sync({ force: true });
//} catch(err) {
  //console.error('err', err);
//}

exports.createUser = async (userObject) => {
  return await this.User.create(userObject);
}

exports.getUserByEmailId = async(emailId) => {
  return await this.User.findOne({ where: { email: emailId } });
}

