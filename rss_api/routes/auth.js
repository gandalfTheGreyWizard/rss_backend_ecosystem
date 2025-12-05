const express = require('express');
const router = express.Router();
const passport = require('passport');
const magicLinkStrategy = require('passport-magic-link').Strategy;

const userModel = require('../models/user');
const authController = require('../controllers/auth');

router.post('/login', authController.authorizeUser);

router.get('/decode', authController.decodeJwt);

module.exports = router;
