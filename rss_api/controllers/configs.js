//imports
const configModel = require('../models/config');
const logger = require('../helpers/logger');
const middlewares = require('../helpers/middlewares');
//functional 
exports.createConfig = async (req,res) => {
  try {
    const createdConfig = await configModel.createConfig(req.body);
    logger.info(JSON.stringify(createdConfig.dataValues));
    res.send(JSON.stringify(createdConfig.dataValues));
  } catch(err) {
    logger.error(err)
    res.status(400).send({ message: 'error creating config' });
  }
}

exports.listConfig = async (req, res) => {
  const userDetails = await middlewares.decodeJwt(req.headers);
  const userConfigs = await configModel.listConfig(userDetails.id);
  const respondWithConfigs = {};
  respondWithConfigs['configs'] = userConfigs;
  res.send(JSON.stringify(respondWithConfigs));
}
