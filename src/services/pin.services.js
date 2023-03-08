const {
  BadRequestError,
  ForbiddenError,
} = require('../exceptions/customError.js');
const { logger } = require('../middlewares/logger');
const PinRepository = require('../repositories/pin.repository.js');

class PinService {
  constructor() {
    this.pinRepository = new PinRepository();
  }

  // 게시글 목록 조회
  getAllPins = async ({ keyword, index }) => {
    logger.info(`PinService.getAllPins`);
    const offset = index ? parseInt(index) : 0;
    let pins;
    if (!keyword) {
      pins = await this.pinRepository.findAll({ offset });
    } else {
      pins = await this.pinRepository.findByKeyword({ keyword, offset });
    }
    return pins ? pins : [];
  };

  // 게시글 상세 조회
  getPin = async ({ pinId }) => {
    logger.info(`PinService.getPin`);
    const pin = await this.pinRepository.findByPinId({ pinId });
    if (!pin) {
      throw new BadRequestError('게시글 조회에 실패하였습니다.');
    }
    return pin;
  };

  // 게시글 생성
  addPin = async ({ userId, title, imageUrl, description, hashtags }) => {
    logger.info(`PinService.addPin`);
    // 핀 저장
    const newPin = await this.pinRepository.create({
      userId,
      title,
      imageUrl,
      description,
      hashtags,
    });
    if (!newPin) throw Error('핀 생성에 실패했습니다.');

    return { message: '게시글을 생성하였습니다.' };
  };

  // 게시글 수정
  updatePin = async ({
    userId,
    pinId,
    title,
    imageUrl,
    description,
    hashtags,
  }) => {
    logger.info(`PinService.updatePin`);
    const pin = await this.pinRepository.findByPinId({ pinId });
    if (!pin) {
      throw new BadRequestError('게시글 조회에 실패하였습니다.');
    }
    if (userId !== pin.userId) {
      throw new ForbiddenError('권한이 없습니다.');
    }
    await this.pinRepository.update({
      userId,
      pinId,
      title,
      imageUrl,
      description,
      hashtags,
    });

    return { messege: '게시글을 수정하였습니다.' };
  };

  // 게시글 삭제
  deletePin = async ({ pinId, userId }) => {
    logger.info(`PinService.deletePin`);
    const pin = await this.pinRepository.findByPinId({ pinId });
    if (!pin) {
      throw new BadRequestError('게시글 조회에 실패하였습니다.');
    }
    if (userId !== pin.userId) {
      throw new ForbiddenError('권한이 없습니다.');
    }
    await this.pinRepository.delete({ pinId });

    return { messege: '게시글을 삭제하였습니다.' };
  };
}

module.exports = PinService;
