const { Saves } = require('../../db/models');
const { logger } = require('../middlewares/logger');

class SaveRepository {
  constructor() {}

  findBySaveId = async ({ userId, pinId }) => {
    logger.info('SaveRepository.findBySaveId');
    const savePin = await Saves.findOne({
      where: { userId, pinId },
    });
    return savePin;
  };

  addSavePin = async ({ userId, pinId }) => {
    logger.info('SaveRepository.addSavePin');
    await Saves.create({ userId, pinId });
    return;
  };

  deleteSavePin = async ({ userId, pinId }) => {
    logger.info('SaveRepository.deleteSavePin');
    await Saves.destroy({ userId, pinId });
    return;
  };
}

module.exports = SaveRepository;
