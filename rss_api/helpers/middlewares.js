const logger = require('./logger');
const jwt = require('jsonwebtoken');

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

