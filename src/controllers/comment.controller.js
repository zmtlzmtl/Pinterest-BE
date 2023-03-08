const { BadRequestError } = require('../exceptions/customError.js');
const CommentService = require('../services/comment.service');
const { logger } = require('../middlewares/logger');

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  getAllComment = async (req, res, next) => {
    logger.info(`CommentController.getAllComment Request`);
    const { pinId } = req.params;
    if (!pinId) {
      throw new BadRequestError('파라미터 값이 올바르지 않습니다.');
    }
    try {
      const comments = await this.commentService.getAllComment({ pinId });
      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req, res, next) => {
    logger.info(`CommentController.addComment Request`);
    const { pinId } = req.params;
    const userId = Math.floor(Math.random() * 11);
    const { content } = req.body;
    try {
      if (!pinId) {
        throw new BadRequestError('파라미터 값이 올바르지 않습니다.');
      }
      if (!content) {
        throw new BadRequestError('내용을 입력해 주세요.');
      }

      const comment = await this.commentService.addComment({
        userId,
        pinId,
        content,
      });

      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  };

  deleteComment = async (req, res, next) => {
    logger.info(`CommentController.deleteComment Request`);
    const userId = Math.floor(Math.random() * 11);
    const { pinId, commentId } = req.params;
    if (!pinId || !commentId) {
      throw new BadRequestError('파라미터 값이 올바르지 않습니다.');
    }
    try {
      const comment = await this.commentService.deleteComment({
        userId,
        pinId,
        commentId,
      });

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CommentController;
