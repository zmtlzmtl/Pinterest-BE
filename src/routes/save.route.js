const express = require('express');
const router = express.Router();

const SaveController = require('../controllers/save.controller');
const saveController = new SaveController();

router.put('/follow/:userId', saveController.savePin);

module.exports = router;
