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
    const result = await Comments.create({
      userId,
      pinId,
      content,
    });
    if (!result) throw new Error('댓글 작성에 실패하였습니다.');
    return;
  };

  deleteComment = async ({ commentId }) => {
    logger.info(`CommentRepository.deleteComment`);
    const result = await Comments.destroy({
      where: { commentId },
    });
    if (!result) throw new Error('댓글 삭제에 실패하였습니다.');
    return;
  };
}

module.exports = CommentRepository;
