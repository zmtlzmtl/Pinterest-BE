const UserService = require("../services/user.service");
const jwt = require('jsonwebtoken');
const session = require("express-session")

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
    logIn = async (req, res) => {
        try {
            let user = await this.userService.getUser({ id, pw })
            const { id, pw } = req.body;

            // set the user ID in the session
            req.session.userId = user.id;

            // return a success response
            res.json({ message: 'Logged in successfully' });
        } catch (err) {
            console.log(err)
            return res.status(400).json({err:err.message})
        }
    }
    // logOut = async () => {
    //     try {
            
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
}
module.exports = UserController