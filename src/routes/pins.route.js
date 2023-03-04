const express = require('express');
const router = express.Router();

const PinController = require('../controllers/pin.controller');
const pinController = new PinController();

router.get('/', pinController.getAllPins);
router.get('/:pinId', pinController.getPin);
router.post('/', pinController.addPin);
// router.put('/:pinId', pinController.updatePin);
// router.delete('/:pinId', pinController.deletePin);

module.exports = router;
