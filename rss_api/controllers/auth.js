require('dotenv').config();

//const passport = require('passport');
//const magicLinkStrategy = require('passport-magic-link').Strategy;
//const sendgrid = require('@sendgrid/mail');

//sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const userModel = require('../models/user');

//passport.use(new MagicLinkStrategy({
  //secret: 'keyboard cat',
  //userFields: [ 'email' ],
  //tokenField: 'token',
  //verifyUserAfterToken: true
//}, (user, token) => {
  //const msg = {
    //to: user.email,
    //from: process.env['EMAIL'],
    //subject: 'Sign in to Todos',
    //text: 'Hello! Click the link below to finish signing in to Todos.\r\n\r\n' + link,
    //html: '<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' + link + '">Sign in</a></p>',
  //};
  //return sendgrid.send(msg);
//}, (user) => {
  //console.log(user);
//}));


