const PinRepository = require('../repositories/pin.repository.js');

class PinService {
  constructor() {
    this.pinRepository = new PinRepository();
  }

  // 게시글 목록 조회
  getAllPins = async () => {
    const pins = await this.pinRepository.findAll();
    return pins;
  };

  // 게시글 상세 조회
  getPin = async ({ pinId }) => {
    const pin = await this.pinRepository.findByPinId({ pinId });
    logger.info(pin);
    if (!pin) {
      const err = new Error('게시글 조회에 실패하였습니다.');
      err.name = '404';
      throw err;
    }
    return pin;
  };

  // 게시글 생성
  createPin = async ({ userId, title, imageUrl, description, hashtags }) => {
    logger.info(
      'PinService.createPin ::',
      userId,
      title,
      imageUrl,
      description,
      hashtags
    );
    await this.pinRepository.create({
      userId,
      title,
      imageUrl,
      description,
      hashtags,
    });
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
    const pin = await this.pinRepository.findByPinId({ pinId });
    if (!pin) {
      const err = new Error('게시글 조회에 실패하였습니다.');
      err.name = '404';
      throw err;
    }
    if (userId !== pin.userId) {
      const err = new Error('권한이 없습니다.');
      err.name = '401';
      throw err;
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
    const pin = await this.pinRepository.findByPinId({ pinId });
    if (!pin) {
      const err = new Error('게시글 조회에 실패하였습니다.');
      err.name = '404';
      throw err;
    }
    if (userId !== pin.userId) {
      const err = new Error('권한이 없습니다.');
      err.name = '401';
      throw err;
    }
    await this.pinRepository.delete({ pinId });

    return { messege: '게시글을 삭제하였습니다.' };
  };
}

module.exports = PinService;
