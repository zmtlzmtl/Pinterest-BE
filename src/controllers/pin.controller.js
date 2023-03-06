const { logger } = require('../middlewares/logger');
const PinService = require('../services/pin.services');

class PinController {
  constructor() {
    this.pinService = new PinService();
  }
  // 게시글 목록 조회
  getAllPins = async (req, res) => {
    logger.info(`PinController.getAllPins Request`);
    const pins = await this.pinService.getAllPins();
    res.status(200).json({ pins });
  };

  // 게시글 상세 조회
  getPin = async (req, res, next) => {
    logger.info(`PinController.getPin Request`);
    const { pinId } = req.params;
    try {
      const result = await this.pinService.getPin({ pinId });
      res.status(200).json({ pin: result });
    } catch (error) {
      next(error);
    }
  };

  // 게시글 작성
  addPin = async (req, res, next) => {
    logger.info(`PinController.addPin Request`);
    const userId = Math.floor(Math.random() * 11);
    const { title, description, hashtags } = req.body;
    const imageUrl = req.file.location;
    try {
      const result = await this.pinService.createPin({
        userId,
        title,
        imageUrl,
        description,
        hashtags,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  // // 게시글 수정
  // updatePin = async (req, res, next) => {
  //   const { userId } = res.locals.user;
  //   const { pinId } = req.params;
  //   const { title, imageUrl, description, hashtags } = req.body;

  //   try {
  //     const result = await this.pinService.updatePin({
  //       pinId,
  //       userId,
  //       title,
  //       imageUrl,
  //       description,
  //       hashtags,
  //     });
  //     res.status(200).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // // 게시글 삭제
  // deletePin = async (req, res, next) => {
  //   const { userId } = res.locals.user;
  //   const { pinId } = req.params;
  //   try {
  //     const result = await this.pinService.deletePin({ pinId, userId });
  //     res.status(200).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

module.exports = PinController;
