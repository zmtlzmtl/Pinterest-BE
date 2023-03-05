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
    logOut = async (req,res) => {
        try {
            if (req.session.userId) {
            // if user is logged in, destroy the session and clear the cookie
            req.session.destroy(err => {
            if (err) {
                // if there's an error destroying the session, return an error response
                return res.status(500).json({ error: 'Could not log out' });
            }
            // clear the user ID cookie
            res.clearCookie('connect.sid');
            // return a success response
            return res.json({ message: 'Logged out successfully' });
            });
        } else {
            // if user is not logged in, return an error response
            return res.status(401).json({ error: 'You are not logged in' });
        }
        }
        catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }
    }
}
module.exports = UserController