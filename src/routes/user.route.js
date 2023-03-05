const { express } = require("express")
const UserController = require("../controllers/user.controller")

const router = express.Router();
const userController = new UserController();

router.post('/singIn', userController.signIn);
