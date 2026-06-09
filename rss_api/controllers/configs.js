//imports
const configModel = require('../models/config');
const logger = require('../helpers/logger');
const helperFunctions = require('../helpers/helperFunctions');
const jwt = require('jsonwebtoken');

// create a configuration against a user with reference to jwt 
exports.createConfig = async (req,res) => {
  try {
    const userAgainstJwt = jwt.decode(req.headers.authorization.split(" ")[1]);
    const configObject = req.body;
    configObject['userId'] = userAgainstJwt.id;
    console.log('to be created ', configObject);
    const createdConfig = await configModel.createConfig(configObject);
    logger.info(JSON.stringify(createdConfig.dataValues));
    res.send(JSON.stringify(createdConfig.dataValues));
  } catch(err) {
    logger.error(err)
    res.status(400).send({ message: 'error creating config' });
  }
}

// list configs agaisnt users with reference to jwt
exports.listConfig = async(req, res) => {
  try {
    const userAgainstJwt = jwt.decode(req.headers.authorization.split(" ")[1]);
    const configObjects = await configModel.listConfigs(userAgainstJwt.id);
    console.log('config objects', configObjects);
    const responseObjects = configObjects.map((eachConfig) => {
      return eachConfig.dataValues;
    });
    res.send(responseObjects);
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
}
