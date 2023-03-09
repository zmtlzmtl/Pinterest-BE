const { logger } = require('../middlewares/logger');
const { Transaction } = require('sequelize');
const { Pins, Tags, PinsTags, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

class PinRepository {
  constructor() {}
  // 게시글 목록 조회
  findAll = async ({ offset }) => {
    logger.info(`PinRepository.findAll`);
    const pins = await Pins.findAll({
      offset: offset * 30,
      limit: 30,
      order: [['createdAt', 'DESC']],
    });
    return pins;
  };

  // 게시글 id로 조회
  findByPinId = async ({ pinId }) => {
    logger.info(`PinRepository.findByPinId`);
    const pin = await Pins.findOne({
      where: { pinId },
    });
    return pin;
  };
  // 게시글 생성
  create = async ({ userId, title, imageUrl, description, hashtags }) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    try {
      // 핀 생성
      logger.info(`PinRepository.create.Pins.create`);
      const newPin = await Pins.create(
        {
          userId,
          title,
          imageUrl,
          description,
          hashtags,
        },
        { transaction: t }
      );
      if (!newPin) throw Error('핀 생성에 실패했습니다.');

      // 태그 저장
      const regex = /\[|\]+/gi;
      const hashtagsArray = hashtags.replaceAll(regex, '').split(',');
      for (const tag of hashtagsArray) {
        logger.info(`PinRepository.create.Tag.create`);
        const newTag = await Tags.create({ tagName: tag }, { transaction: t });

        logger.info(`PinRepository.create.PinsTags.createPinTag`);
        const result = await PinsTags.create(
          {
            pinId: newPin.pinId,
            tagId: newTag.tagId,
          },
          { transaction: t }
        );
        if (!result) throw Error('핀 생성에 실패했습니다.');
      }
      await t.commit();
      return newPin;
    } catch (e) {
      console.error(e);
      await t.rollback();
    }
  };

  // 게시글 수정
  update = async ({
    userId,
    pinId,
    title,
    imageUrl,
    description,
    hashtags,
  }) => {
    logger.info(`PinRepository.update`);
    await Pins.update(
      { title, imageUrl, description, hashtags },
      {
        where: { pinId },
      }
    );
    return;
  };

  // 게시글 삭제
  delete = async ({ pinId }) => {
    logger.info(`PinRepository.delete`);
    await Pins.destroy({
      where: { pinId },
    });
    return;
  };

  // 게시글 태그로 목록 조회
  findByKeyword = async ({ keyword, offset }) => {
    logger.info(`PinRepository.findByKeyword`);
    const pin = await Pins.findAll({
      offset: offset * 30,
      limit: 30,
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { hashtags: { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [['createdAt', 'DESC']],
    });
    return pin;
  };
}

module.exports = PinRepository;
