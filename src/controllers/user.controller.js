const UserService = require('../services/user.service.js');
const AuthService = require('../services/auth.service.js');
const { UnauthorizedError } = require('../exceptions/customError.js');
const { logger } = require('../middlewares/logger');

class UserController {
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }
  // 회원 가입
  userSignup = async (req, res, next) => {
    logger.info(`UserController.userSignup Request`);
    const { email, nickname, password } = req.body;
    try {
      await this.userService.createUser({ email, nickname, password });
      return res.status(201).json({ data: '회원가입에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  userLogin = async (req, res, next) => {
    logger.info(`UserController.userLogin Request`);
    const { email, password } = req.body;

    try {
      // 이메일, 비밀번호 유저 존재 확인
      const existUser = await this.userService.findLoginUser({
        email,
        password,
      });
      if (!existUser) {
        throw new UnauthorizedError('이메일이나 비밀번호가 일치하지 않습니다.');
      }
      // 토큰 생성
      const token = await this.authService.generateToken({
        userId: existUser.userId,
      });

      // cookie로 유저 정보 전달
      res.header('Authorization', `Bearer ${token}`);
      res.status(200).json({
        userId: existUser.userId,
        message: '로그인을 성공하였습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  // 회원 검증
  userValidate = async (req, res, next) => {
    const { token } = req.body;
    try {
      if (!token) {
        throw new Error('비회원');
      }
      // 토큰 검증
      const user = await this.authService.verifyToken(token);
      console.log('user:', user);
      if (!user) {
        throw new Error('비회원');
      }
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ ok: false });
    }
  };
}

module.exports = UserController;
