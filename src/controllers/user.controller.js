const UserService = require("../services/user.service");
const jwt = require('jsonwebtoken');

class UserController {
    constructor() {
        this.userService = new UserService();
    }
    signIn = async (req, res) => {
        try {
            const { id, pw, nickname } = req.body;
            const account = await this.userService.createUser({id, pw, nickname})
            return res.status(200).json({ user: account })
        } catch (err) {
            console.log(err)
            return res.status(400).json({err:err.message})
        }
    }
}
module.exports = UserController