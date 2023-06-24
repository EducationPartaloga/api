const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const auth = require("../middlewares/auth");
const validationRequest = require('../requests/validationRequest');
const hasUser = require('../middlewares/hasUser')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: User Auth
 *   description: API для регистрации, аутентификации и авторизации пользователя
 * /register:
 *   post:
 *     summary: Создание аккаун та пользователя в базе
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerRequest'
 *     responses:
 *       201:
 *         description: The created user account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userModel'
 *       500:
 *         description: Some server error
 *
 */
router.post("/register", validationRequest.register, hasUser.check, userController.register);

router.get("/confirm", validationRequest.confirm, hasUser.check, userController.confirm);

module.exports = router;