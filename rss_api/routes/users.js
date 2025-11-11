var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

router.get('/mail/:mailId', userController.getUserByEmailId);

router.post('/create', userController.handleUsers);

module.exports = router;
