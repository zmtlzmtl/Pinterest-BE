const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../middlewares/upload.middleware');
const PinController = require('../controllers/pin.controller');
const pinController = new PinController();
const pinValidation = require('../validations/pinValidation');
const loginMiddleware = require('../middlewares/login.middleware');

router.get('/pins', pinController.getAllPins);
router.get('/pins/:pinId', pinValidation.paramCheck, pinController.getPin);
router.post(
  '/pins',
  loginMiddleware,
  uploadMiddleware,
  pinValidation.pinCheck,
  pinController.addPin
);
// router.put('/:pinId', pinValidation.pinCheck, pinController.updatePin);
router.delete(
  '/:pinId',
  loginMiddleware,
  pinValidation.pinCheck,
  pinController.deletePin
);

module.exports = router;
