const { Users } = require("C:/Users/User/Desktop/clonecoding/db/models/users.js")

class UserRepo {
  constructor() { }
  signInUser = async ({id, pw, nickname}) => {
    const user = await Users.create({
      id, pw, nickname
    })
    return user
  }
  loginUser = async () => {
    const user = await Users.findOne({

    })
      return user;
  }
}

module.exports = UserRepo