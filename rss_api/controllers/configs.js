const configModel = require('../models/config');

exports.createConfig = async (req,res) => {
  console.log(req.body);
  try {
    const createdConfig = await configModel.createConfig(req.body);
    console.log(JSON.stringify(createdConfig.dataValues));
    res.send(JSON.stringify(createdConfig.dataValues));
  } catch(err) {
    console.error(err);
    res.status(400).send({ message: 'error creating config' });
  }
}
