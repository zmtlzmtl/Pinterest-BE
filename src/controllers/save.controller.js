const SaveService = require('../services/save.service');
const { logger } = require('../middlewares/logger');

class SaveController {
  constructor() {
    this.saveService = new SaveService();
  }
  savePin = async (req, res, next) => {
    logger.info(`SaveController.savePin Request`);
    try {
      const userId = Math.floor(Math.random() * 11);
      const { pinId } = req.params;

      const save = await this.saveService.savePin({ userId, pinId });
      return res.status(201).json(save);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SaveController;
