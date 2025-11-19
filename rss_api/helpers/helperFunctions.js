// all the standard service definitions go in this file
const crypto = require('crypto');
const logger = require('./logger');
const jwt = require('jsonwebtoken');

//function that sanitizes userObject for response
exports.sanitizeUser = (userObject) => {
  const responseObject = userObject.dataValues;
  delete responseObject.password;
  delete responseObject.salt;
  return responseObject;
}

// function to check if the provided password by user is same 
exports.checkPassword = (userObject, passwordInRequestBody) => {
  const passwordAgainstRequestBody = crypto.pbkdf2Sync(passwordInRequestBody, userObject.salt, 1000, 64, 'sha512').toString('hex');
  if (passwordAgainstRequestBody == userObject.password) {
    return true;
  } else {
    return false;
  }
}


// middleware to check if the jwt token in the header is authorized
exports.authorizeJwt = (req, res, next) => {
  try {
    const jwtRequestToken = req.headers.authorization.split(" ")[1];
    console.log(jwt.verify(jwtRequestToken, 'static_secret'));
    next();
  } catch(err) {
    logger.error(err);
    res.status(403).send({ message: 'Unauthorized' });
  }
}
