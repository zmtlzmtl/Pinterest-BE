const UserRepository = require('../repositories/user.repository.js');
const { Conflict, UnauthorizedError } = require('../exceptions/customError.js');
const { logger } = require('../middlewares/logger');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  // 회원 생성
  createUser = async ({ email, nickname, password }) => {
    logger.info(`UserService.createUser Request`);
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SIGNUP_SALT)
    );
    // 닉네임 중복 확인
    const existUser = await this.userRepository.findUserByEmail({ email });
    if (existUser) {
      throw new Conflict('이미 존재하는 이메일입니다.');
    }
    // DB 생성
    const result = await this.userRepository.createUser({
      email,
      nickname,
      password: hashedPassword,
    });
    return result;
  };

  // 이메일, 비밀번호로 유저 존재 확인 생성
  findLoginUser = async ({ email, password }) => {
    logger.info(`UserService.findLoginUser Request`);
    const loginUser = await this.userRepository.findUserByEmail({ email });
    if (!loginUser) {
      throw new UnauthorizedError('이메일이나 비밀번호가 일치하지 않습니다.');
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loginUser.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError('이메일이나 비밀번호가 일치하지 않습니다.');
    }
    return loginUser;
  };
}

module.exports = UserService;
