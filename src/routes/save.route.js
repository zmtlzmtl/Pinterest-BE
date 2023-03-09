const express = require('express');
const router = express.Router();

const SaveController = require('../controllers/save.controller');
const saveController = new SaveController();
const loginMiddleware = require('../middlewares/login.middleware');

router.get('/', loginMiddleware, saveController.getAllPin);
router.put('/pins/:pinId', loginMiddleware, saveController.savePin);

module.exports = router;
