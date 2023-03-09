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
    await Saves.destroy({
      where: { userId, pinId },
    });
    return;
  };

  getAllPin = async ({ userId }) => {
    logger.info('SaveRepository.getAllPin');
    const getSave = await Saves.findAll({
      where: { userId },
    });
    return getSave;
  };
}

module.exports = SaveRepository;
