const UserRepo = require("../repositories/user.repository")
const jwt = require("jsonwebtoken")

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }
    createUser = async ({id, pw, nickname}) => {
        const user = await this.userRepo.signInUser({id, pw, nickname})
        return user;
    }
    getUser = async ({id, pw}) => {
        const loginUser = await this.userRepo.getUser({ id, pw })

        return loginUser
    }
}
module.exports = UserService;