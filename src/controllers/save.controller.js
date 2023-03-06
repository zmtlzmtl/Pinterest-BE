const SaveService = require('../services/save.service');
const { logger } = require('../middlewares/logger');

class SaveController {
  constructor() {
    this.saveService = new SaveService();
  }
  saveUser = async (req, res, next) => {
    logger.info(`SaveController.saveUser Request`);
    try {
      const userId = Math.floor(Math.random() * 11);
      const { pinId } = req.params;

      const save = await this.saveService.saveUser({ userId, pinId });
      return res.status(201).json(save);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SaveController;
