//environment variables
require('dotenv').config()

// imports
const { Sequelize } = require('sequelize');
const redis = require('redis');
const logger = require('../helpers/logger.js');

let redisConnection;
// sequelize postgres connection definition
const sequelize = new Sequelize(
  process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, 
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres'
  }
);

// redis connection definitions 
const redisClientConnection = redis.createClient({
  url: process.env.REDIS_URL
});
redisClientConnection.on('error', (err) => {
  logger.error(err);
});

const getRedisConnection = async () => {
  if (redisConnection) {
    return redisConnection;
  } 
  redisConnection = redisClientConnection.connect();
  return await redisConnection;
}

module.exports = { redisClientConnection, sequelize, getRedisConnection }
