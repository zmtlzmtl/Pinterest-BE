const UserRepo = require("../repositories/user.repository")

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }
    createUser = async ({id, pw, nickname}) => {
        const user = await this.userRepo.signInUser({id, pw, nickname})
        return user;
    }
    loginUser = async () => {
        
    }
}
module.exports = UserService;