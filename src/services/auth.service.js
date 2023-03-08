const UserRepository = require('../repositories/user.repository.js');
const { ForbiddenError } = require('../exceptions/customError.js');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  // 토큰 생성
  generateToken = async ({ userId }) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    return token;
  };

  // 토큰 복호화 및 검증
  verifyToken = async (token) => {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!userId) {
      throw new ForbiddenError('로그인 후 사용이 가능합니다.');
    }
    const user = await this.userRepository.findByUserId({ userId });
    return user;
  };
}

module.exports = AuthService;
