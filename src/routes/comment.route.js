const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();
const commentValidation = require('../validations/commentValidation');

router.get(
  '/:pinId/comments',
  commentValidation.paramCheck,
  commentController.getAllComment
);
router.post(
  '/:pinId/comments',
  commentValidation.paramCheck,
  commentValidation.commentCheck,
  commentController.addComment
);
router.delete(
  '/:pinId/comments/:commentId',
  commentValidation.paramCheck,
  commentController.deleteComment
);

module.exports = router;
