const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:pinId/comment', commentController.addComment);
router.delete('/:pinId/comment/:commentId', commentController.deleteComment);

module.exports = router;
