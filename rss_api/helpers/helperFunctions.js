// all the standard service definitions go in this file


//function that sanitizes userObject for response
exports.sanitizeUser = (userObject) => {
  const responseObject = userObject.dataValues;
  delete responseObject.password;
  delete responseObject.salt;
  return responseObject;
}
