const { Users } = require('../../db/models');

class UserRepository {
  constructor() {}

  createUser = async (newUser) => {
    const createdNewUser = await Users.create(newUser);
    return createdNewUser;
  };

  // 중복 닉네임 조회
  findUserByEmail = async ({ email }) => {
    const user = await Users.findOne({
      where: { email },
    });
    return user;
  };

  // user Id로 조회
  findByUserId = async ({ userId }) => {
    const user = await Users.findOne({
      where: { userId },
      attributes: ['userId', 'email', 'nickname'],
    });
    return user;
  };
}

module.exports = UserRepository;
