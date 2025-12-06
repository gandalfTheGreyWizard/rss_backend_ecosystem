//imports
const userModel = require('../models/user');
const logger = require('../helpers/logger');
const crypto = require('crypto');
const helperFunctions = require('../helpers/helperFunctions');


//functional
exports.createUser = async (req, res) => {
  try {
    const existingUser = await userModel.getUserByEmailId(req.body.email);
    if (existingUser) {
      res.status(409).send({ 'message': 'user already exists' });
    } else {
      try {
        //const userCreationObject = JSON.parse(req.body);
        const createdUser = await userModel.createUser(req.body);
        res.send(JSON.stringify(helperFunctions.sanitizeUser(createdUser)));
      } catch(err) {
        logger.error(err);
        res.status(400).send({ 'message': 'bad request' });
      }
    }
  } catch(err) {
    logger.error(err);
  }
}

exports.getUserByEmailId = async (req, res) => {
  const userFound = await userModel.getUserByEmailId(req.params.mailId);
  if (userFound) {
    res.end(JSON.stringify(helperFunctions.sanitizeUser(userFound)));
  } else {
    res.status(404).send({ 'message': 'user not found' });
  }
}


// PATCH /user/{userId}/password -d {password: [new password]}
exports.updateUserPassword = async (req, res) => {
  const userFound = await userModel.getUserById(req.params.userId);
  if (userFound) {
    userModel.setPassword(userFound);
    res.send(JSON.stringify(helperFunctions.sanitizeUser(userFound)));
  } else {
    res.status(404).send({ 'message': 'no such user found' });
  }
}
