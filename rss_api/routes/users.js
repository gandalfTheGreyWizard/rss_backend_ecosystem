const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const helperFunctions = require('../helpers/helperFunctions');

/**
 * @openapi
 * /users/mail/{mailId}:
 *   get:
 *     parameters:
 *      -  name: mailId
 *         description: mail id of the user to fetch
 *         in: path
 *         schema:
 *          required: true
 *          type: string
 *     description: get a user against provided mail id!
 *     responses:
 *       200:
 *         description: It responds with a user object.
 */

router.get('/mail/:mailId', userController.getUserByEmailId);

/**
 * @openapi:
 * /users/create:
 *   post:
 *     description: create a new user!
 *     requestBody:
 *      description: insert a valid user
 *      required: 
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Responds with the created user.
 */
router.post('/create', helperFunctions.authorizeJwt, userController.createUser);

/**
 * @openapi
 * /users/mail/{mailId}:
 *   get:
 *     parameters:
 *      -  name: mailId
 *         description: mail id of the user to fetch
 *         in: path
 *         schema:
 *          required: true
 *          type: string
 *     description: get a user against provided mail id!
 *     responses:
 *       200:
 *         description: It responds with a user object.
 */
router.patch('/:userId/password', helperFunctions.authorizeJwt, userController.updateUserPassword);

module.exports = router;
