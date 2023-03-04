const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/', commentController.addComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
