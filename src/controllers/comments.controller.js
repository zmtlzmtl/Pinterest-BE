const CommentService = require('../services/comment.service.js');

class CommentController {
    constructor() {
        this.commentService = new CommentService();
    }
    getComment = async (req, res, next) => {
        const {postId} = req.params;
        try {
            const comments = await this.commentService.getCom
        } catch (error) {
          next(error)
    }


}

module.exports = CommentController