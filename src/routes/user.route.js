const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');
const userController = new UserController();

// 회원가입 API
router.post('/signup', userController.userSignup);
// 로그인 API
router.post('/login', userController.userLogin);
router.post('/checkAuth', authMiddleware, userController.userValidate);

module.exports = router;
