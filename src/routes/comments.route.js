const express = reqiure('express');
const router = express.Router();

const CommentController = require('../controllers/comments.controller');
const commentController = new CommentController();

router.get('/pin/:pinId/comment', commentController.getComment);
router.post('/pin/:pinId/comment', commentController.addComment);
router.put('/pin/:pinId/comment/:commentId', commentController.updateComment);
router.delete(
  '/pin/:pinId/comment/:commentId',
  commentController.deleteComment
);

module.exports = router;