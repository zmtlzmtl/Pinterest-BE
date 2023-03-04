class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }

  createComment = async (userId, pinId, content) => {
    const comment = await this.commentsModel.create({
      userId,
      pinId,
      content,
    });
    return comment;
  };

  destroyComment = async (commentId) => {
    const comment = await this.commentsModel.destroy({
      where: { commentId },
    });
    return comment;
  };
}

module.exports = CommentRepository;
