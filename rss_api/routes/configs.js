var express = require('express');
var router = express.Router();
const configController = require('../controllers/configs');

/**
 * @openapi:
 * /configs/create:
 *   post:
 *     description: create config against existing user!
 *     requestBody:
 *      description: Insert a valid config object and make sure the userId of the user exists
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Config'
 *     responses:
 *       200:
 *         description: Responds with the created user.
 */
router.post('/create', configController.createConfig);

module.exports = router;
