const {
  BadRequestError,
  ForbiddenError,
} = require('../exceptions/customError.js');
const { logger } = require('../middlewares/logger');
const CommentRepository = require('../repositories/comment.repository');
const PinRepository = require('../repositories/pin.repository');

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.pinRepository = new PinRepository();
  }
  getAllComment = async ({ pinId }) => {
    logger.info(`CommentService.addComment`);
    const existPin = await this.pinRepository.findByPinId({ pinId });
    if (!existPin) {
      throw new BadRequestError('게시글 조회에 실패하였습니다.');
    }
    const comments = await this.commentRepository.findAllComment({ pinId });

    return comments;
  };
  addComment = async ({ userId, pinId, content }) => {
    logger.info(`CommentService.addComment`);
    const existPin = await this.pinRepository.findByPinId({ pinId });
    if (!existPin) {
      throw new BadRequestError('게시글 조회에 실패하였습니다.');
    }
    await this.commentRepository.addComment({ userId, pinId, content });

    return { message: '댓글을 생성하였습니다.' };
  };

  deleteComment = async ({ userId, commentId }) => {
    logger.info(`CommentService.deleteComment`);
    const existComment = await this.commentRepository.findByCommentId({
      commentId,
    });
    if (!existComment) {
      throw new BadRequestError('댓글 조회에 실패하였습니다.');
    }
    // userId 구현 시 진행
    // if (Comment.userId !== userId) {
    //   throw new ForbiddenError('권한이 없습니다.');
    // }
    await this.commentRepository.deleteComment({ commentId });
    return { message: '댓글을 삭제하였습니다.' };
  };
}

module.exports = CommentService;
