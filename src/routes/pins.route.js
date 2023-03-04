const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../middlewares/upload.middleware');
const PinController = require('../controllers/pin.controller');
const pinController = new PinController();

router.get('/pins', pinController.getAllPins);
router.get('/pin/:pinId', pinController.getPin);
router.post('/pin', uploadMiddleware, pinController.addPin);
// router.put('/:pinId', pinController.updatePin);
// router.delete('/:pinId', pinController.deletePin);

module.exports = router;
