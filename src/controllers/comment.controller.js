const CommentService = require('../services/comment.service');
const { logger } = require('../middlewares/logger');

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  getAllComment = async (req, res) => {
    logger.info(`CommentController.getAllComment Request`);
    const { pinId } = req.params;
    const comments = await this.commentService.getAllComment({ pinId });
    res.status(200).json({ comments });
  };

  addComment = async (req, res, next) => {
    logger.info(`CommentController.addComment Request`);
    const { pinId } = req.params;
    const userId = Math.floor(Math.random() * 11);
    const { content } = req.body;
    try {
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
