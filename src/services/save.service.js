const { BadRequestError } = require('../exceptions/customError.js');
const { logger } = require('../middlewares/logger');
const SaveRepository = require('../repositories/save.repository');
const PinRepository = require('../repositories/pin.repository');

class SaveService {
  constructor() {
    this.saveRepository = new SaveRepository();
    this.pinRepository = new PinRepository();
  }
  savePin = async ({ userId, pinId }) => {
    logger.info('SaveService.savePin');
    const existPin = await this.pinRepository.findByPinId({ pinId });
    if (!existPin) {
      throw new BadRequestError('게시글 조회에 실패하였습니다.');
    }

    const existSavePin = await this.saveRepository.findBySaveId({
      userId,
      pinId,
    });
    if (!existSavePin) {
      await this.saveRepository.addSavePin({ userId, pinId });
      return { message: 'Pin을 저장하였습니다.' };
    }
    await this.saveRepository.deleteSavePin({ userId, pinId });
    return { message: 'Pin이 제거되었습니다' };
  };
  getAllPin = async ({ userId }) => {
    logger.info('SaveService.getAllPin');
    const getSave = await this.saveRepository.getAllPin({ userId });

    return getSave.map((save) => {
      return {
        pinId: save.pinId,
      };
    });
  };
}

module.exports = SaveService;
