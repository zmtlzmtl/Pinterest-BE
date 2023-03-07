const Joi = require('joi');
const { BadRequestError } = require('../src/exceptions/customError');
const { logger } = require('../src/middlewares/logger');

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
    const check = Joi.object().keys({
      content: Joi.string()
        .required()
        .error(new BadRequestError('알맞은 형식의 내용을 입력하세요.')),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },
};

module.exports = pinValidation;
