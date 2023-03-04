const CommentService = require('../services/comment.service');

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  addComment = async (req, res, next) => {
    const { pinId } = req.params;
    const { cotent } = req.body;
    try {
      const comment = await this.commentService.addComment({ pinId, cotent });

      res.status(201).json({ comment });
    } catch (error) {
      next(error);
    }

    deleteComment = async (req, res, next) => {
      const { pinId, commentId } = req.params;
      try {
        const comment = await this.commentService.deleteComment({
          pinId,
          commentId,
        });

        res.status(200).json(comment);
      } catch (error) {
        next(error);
      }
    };
  };
}

module.exports = CommentController;
