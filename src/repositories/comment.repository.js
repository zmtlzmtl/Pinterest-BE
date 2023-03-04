const { Comments } = require('../../models');

class CommentRepository {
  constructor() {}

  createComment = async ({ pinId, content }) => {
    await Comments.create({
      pinId,
      content,
    });
    return;
  };

  destroyComment = async ({ commentId }) => {
    await Comments.destroy({
      where: { commentId },
    });
    return;
  };
}

module.exports = CommentRepository;
