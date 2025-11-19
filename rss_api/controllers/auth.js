//module imports
require('dotenv').config();
const logger = require('../helpers/logger');
const helperFunctions = require('../helpers/helperFunctions');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

//functional sections
exports.authorizeUser = async (req, res) => {
  try {
    const userAgainstMailId = await userModel.getUserByEmailId(req.body.email);
    const checkPassword = helperFunctions.checkPassword(userAgainstMailId.dataValues, req.body.password);
    if (checkPassword) {
      const userObject = helperFunctions.sanitizeUser(userAgainstMailId);
      const jwtToken = jwt.sign(userObject, 'static_secret', { expiresIn: "1h" });
      res.send({ token: jwtToken.toString() });
    } else {
      res.status(401).send({ message: 'invalid credentials provided' });
    }
  } catch(err) {
    logger.error(err);
    res.status(400).send({ message: 'bad request' });
  }
}

exports.decodeJwt = async (req, res) => {
  const jwtRequestToken = req.headers.authorization.split(" ")[1];
  try {
    console.log(jwt.verify(jwtRequestToken, 'static_secret'));
    console.log(jwt.decode(jwtRequestToken));
  } catch(err) {
    logger.error(err);
  }
  res.send({message: 'headers in the query object'});
}
