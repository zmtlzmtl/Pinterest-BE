const { logger } = require('../middlewares/logger');
const { Pins, Tags, PinsTags, sequelize } = require('../../db/models');
const { Transaction } = require('sequelize');

class PinRepository {
  constructor() {}
  // 게시글 목록 조회
  findAll = async () => {
    logger.info(`PinRepository.findAll`);
    const pins = await Pins.findAll({
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
    logger.info(`PinRepository.create`);
    const regex = /\[|\]+/gi;
    const hashtagsArray = hashtags.replaceAll(regex, '').split(',');

    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      // 핀 저장
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

      // 태그 저장
      logger.info(`PinRepository.create.Tags.create`);
      for (tag of hashtagsArray) {
        await Tags.create({ tagName: tag }, { transaction: t });
        logger.info(`PinRepository.create.Tags.findOne`);
        const newTag = await Tags.findOne(
          { where: { tagName: tag } },
          { transaction: t }
        );
        logger.info(`PinRepository.create.PinsTags.create`);
        await PinsTags.create(
          { tagId: newTag, pinId: newPin.pinId },
          { transaction: t }
        );
      });
      }
      

      t.commit();
    } catch (e) {
      console.error(e);
      t.rollback();
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
}

module.exports = PinRepository;
