var express = require('express');
var router = express.Router();
const configController = require('../controllers/configs');

router.post('/create', configController.createConfig);

module.exports = router;
