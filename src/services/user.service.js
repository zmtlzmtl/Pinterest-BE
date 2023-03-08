const UserRepository = require('../repositories/user.repository.js');
const {
  BadRequestError,
  UnauthorizedError,
} = require('../exceptions/customError.js');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  // 회원 생성
  createUser = async ({ email, nickname, password }) => {
    const newUser = { email, nickname, password };
    // 닉네임 중복 확인
    const existUser = await this.userRepository.findUserByEmail({ email });
    if (existUser) {
      throw new BadRequestError('이미 존재하는 이메일입니다.');
    }
    // DB 생성
    const result = await this.userRepository.createUser(newUser);
    return result;
  };

  // 이메일, 비밀번호로 유저 존재 확인 생성
  findLoginUser = async ({ email, password }) => {
    const loginUser = await this.userRepository.findUserByEmail({ email });
    if (!loginUser || password !== loginUser.password) {
      throw new UnauthorizedError('이메일이나 비밀번호가 일치하지 않습니다.');
    }
    return loginUser;
  };
}

module.exports = UserService;
