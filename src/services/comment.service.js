const CommentRepository = require('../repositories/comment.repository');
const PinRepository = require('../repositories/pin.repository');

class CommentService {
  constructor() {
    this.commentRepository = CommentRepository();
    this.pinRepository = PinRepository();
  }
  addComment = async ({ pinId, content }) => {
    const existComment = await this.pinRepository.findByPinId({ pinId });
    if (!existComment) {
      const err = new Error('게시글 조회에 실패하였습니다.');
      err.name = '404';
      throw err;
    }
    await this.commentRepository.addComment({ pinId, content });

    return { message: '댓글을 생성하였습니다.' };
  };

  //userId 추가
  deleteComment = async ({ pinId, commentId }) => {
    await this.commentRepository.deleteComment({ commentId });
    return { message: '댓글을 삭제하였습니다.' };
  };
}

module.exports = CommentService;
