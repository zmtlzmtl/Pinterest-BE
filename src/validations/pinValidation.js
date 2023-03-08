const Joi = require('joi');
const { BadRequestError } = require('../exceptions/customError');
const { logger } = require('../middlewares/logger');

const pinValidation = {
  paramCheck: async (req, res, next) => {
    logger.info(`pinValidation.paramCheck`);
    const check = Joi.object().keys({
      // 나중에 authMiddleware를 거칠 때
      // userId: Joi.number()
      //   .required()
      //   .error(new BadRequestError('알맞은 형식의 유저정보를 입력하세요.')),
      pinId: Joi.number()
        .required()
        .error(new BadRequestError('알맞은 형식의 Pin정보를 입력하세요.')),
    });
    try {
      await check.validateAsync(req.params);
    } catch (error) {
      next(error);
    }
    next();
  },
  pinCheck: async (req, res, next) => {
    logger.info(`pinValidation.pinCheck`);
    const check = Joi.object()
      .keys({
        title: Joi.string()
          .required()
          .error(new BadRequestError('알맞은 형식의 제목을 입력하세요.')),
        description: Joi.string()
          .required()
          .error(new BadRequestError('알맞은 형식의 내용을 입력하세요.')),
        hashtags: Joi.string()
          .required()
          .error(new BadRequestError('알맞은 형식의 해시태그를 입력하세요.')),
        // 해쉬태그의 변경으로 아직 설정X, 이미지 검증은 어떻게 할까?
        // 해쉬태그는 모델에서 null값을 가질 수 없게 설정되었음.
      })
      .unknown();
    try {
      await check.validateAsync(JSON.parse(req.body.data));
    } catch (error) {
      next(error);
    }
    next();
  },
};

module.exports = pinValidation;
