const { Comments } = require('../../db/models');
const { logger } = require('../middlewares/logger');

class CommentRepository {
  constructor() {}

  findAllComment = async ({ pinId }) => {
    logger.info(`CommentRepository.findAllComment`);
    const comments = await Comments.findAll({
      where: { pinId },
      order: [['createdAt', 'DESC']],
    });
    return comments;
  };

  findByCommentId = async ({ commentId }) => {
    logger.info(`CommentRepository.findByCommentId`);
    const comment = await Comments.findOne({
      where: { commentId },
    });
    return comment;
  };

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
