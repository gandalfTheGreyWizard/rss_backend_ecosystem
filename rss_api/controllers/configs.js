//imports
const configModel = require('../models/config');
const logger = require('../helpers/logger');
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
