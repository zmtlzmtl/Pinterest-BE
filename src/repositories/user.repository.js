const { Users } = require('../../db/models');
const { logger } = require('../middlewares/logger');

class UserRepository {
  constructor() {}

  createUser = async ({ email, nickname, password }) => {
    logger.info(`UserRepository.createUser Request`);
    const createdNewUser = await Users.create({
      email,
      nickname,
      password,
    });
    return createdNewUser;
  };

  // 중복 닉네임 조회
  findUserByEmail = async ({ email }) => {
    logger.info(`UserRepository.findUserByEmail Request`);
    const user = await Users.findOne({
      where: { email },
    });
    return user;
  };

  // user Id로 조회
  findByUserId = async ({ userId }) => {
    logger.info(`UserRepository.findByUserId Request`);
    const user = await Users.findOne({
      where: { userId },
      attributes: ['userId', 'email', 'nickname'],
    });
    return user;
  };
}

module.exports = UserRepository;
