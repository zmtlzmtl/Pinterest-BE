const { Saves, Pins } = require('../../db/models');
const { logger } = require('../middlewares/logger');
const parseSequelizePrettier = require('../helpers/parse.sequelize.helper');

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
    const getSave = await Pins.findAll({
      include: [
        {
          model: Saves,
          attributes: ['saveId'],
          where: { userId },
        },
      ],
      group: ['Saves.pinId'],
      raw: true,
    }).then((model) => model.map(parseSequelizePrettier));
    return getSave;
  };
}

module.exports = SaveRepository;
