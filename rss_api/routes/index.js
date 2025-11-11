var express = require('express');
var router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Hello there!
 *     responses:
 *       200:
 *         description: This is index.
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
