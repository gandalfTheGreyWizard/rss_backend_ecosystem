var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
/**
 * @openapi
 * /:
 *   get:
 *     description: mastodon get feed!
 *     responses:
 *       200:
 *         description: This is index.
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

