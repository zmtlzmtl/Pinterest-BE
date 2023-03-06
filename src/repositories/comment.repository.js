const { Comments } = require('../../db/models');
const { logger } = require('../middlewares/logger');

class CommentRepository {
  constructor() {}

  addComment = async ({ userId, pinId, content }) => {
    logger.info(`CommentRepository.addComment`);
    await Comments.create({
      userId,
      pinId,
      content,
    });
    return;
  };

  deleteComment = async ({ commentId }) => {
    logger.info(`CommentRepository.deleteComment`);
    await Comments.destroy({
      where: { commentId },
    });
    return;
  };
}

module.exports = CommentRepository;
