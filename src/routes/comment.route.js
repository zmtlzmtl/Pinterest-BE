const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.get('/:pinId/comments', commentController.getAllComment);
router.post('/:pinId/comments', commentController.addComment);
router.delete('/:pinId/comments/:commentId', commentController.deleteComment);

module.exports = router;
