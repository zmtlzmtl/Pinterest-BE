const { express } = require("express")
const UserController = require("../controllers/user.controller")

const router = express.Router();
const userController = new UserController();

router.use(session({
  secret: 'mySecretKey', // set a secret key to sign the session ID cookie
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until something is stored
}));

router.post('/login', userController.logIn)
router.post('/signIn', userController.signIn);