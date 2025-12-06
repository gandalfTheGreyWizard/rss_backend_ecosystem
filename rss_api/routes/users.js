const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const middlewares = require('../helpers/middlewares');
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

router.get('/mail/:mailId', middlewares.authorizeJwt, userController.getUserByEmailId);

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
router.post('/create', middlewares.authorizeJwt, userController.createUser);

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

 */
router.patch('/:userId/password', middlewares.authorizeJwt, userController.updateUserPassword);

module.exports = router;
