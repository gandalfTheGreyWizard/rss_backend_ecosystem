const express = require('express');
const router = express.Router();
const passport = require('passport');
const magicLinkStrategy = require('passport-magic-link').Strategy;
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const userModel = require('../models/user');
const authController = require('../controllers/auth');

router.post('/login', authController.authorizeUser);

router.get('/decode', authController.decodeJwt);

module.exports = router;
