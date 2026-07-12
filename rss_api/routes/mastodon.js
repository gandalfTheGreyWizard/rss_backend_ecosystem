var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const mastodonController = require('../controllers/mastodon');
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
router.get('/', mastodonController.getStatus);

router.get('/next/:reset', mastodonController.getStatusSince)

module.exports = router;

