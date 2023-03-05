const { Users } = require("C:/Users/User/Desktop/clonecoding/db/models/users.js")
const { Op } = require("sequelize");

class UserRepo {
  constructor() { }
  signInUser = async ({id, pw, nickname}) => {
    const user = await Users.create({
      id, pw, nickname
    })
    return user
  }
  getUser = async ({id, pw}) => {
    const user = await Users.findOne({
        where: {
          [Op.and]: [{id}, {pw}],
        },
    })
      return user;
  }
}

module.exports = UserRepo