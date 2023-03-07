const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../middlewares/upload.middleware');
const PinController = require('../controllers/pin.controller');
const pinController = new PinController();
const pinValidation = require('../validations/pinValidation');

router.get('/pins', pinController.getAllPins);
router.get('/pins/:pinId', pinValidation.paramCheck, pinController.getPin);
router.post(
  '/pins',
  uploadMiddleware,
  pinValidation.pinCheck,
  pinController.addPin
);
// router.put('/:pinId', pinValidation.pinCheck, pinController.updatePin);
// router.delete('/:pinId', pinValidation.pinCheck, pinController.deletePin);

module.exports = router;
