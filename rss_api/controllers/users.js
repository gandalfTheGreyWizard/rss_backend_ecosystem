//imports
const userModel = require('../models/user');
const logger = require('../helpers/logger');

//functional
exports.handleUsers = async (req, res) => {
  try {
    //const userCreationObject = JSON.parse(req.body);
    const createdUser = await userModel.createUser(req.body);
    res.end(JSON.stringify(createdUser.dataValues));
  } catch(err) {
    logger.error(err);
    res.status(400).send({ 'message': 'bad request' });
  }
}

exports.getUserByEmailId = async (req, res) => {
  const userFound = await userModel.getUserByEmailId(req.params.mailId);
  if (userFound) {
    res.end(JSON.stringify(userFound.dataValues));
  } else {
    res.status(404).send({ 'message': 'user not found' });
  }
}
