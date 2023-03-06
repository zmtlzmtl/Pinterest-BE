const CommentRepository = require('./comments.repository.js');

let mockCommentsModel = {
  create: jest.fn(),
  destroy: jest.fn(),
};

let commentRepository = new CommentRepository(mockCommentsModel);

describe('Layered Architecture Pattern Comment Repository Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Comment Repository create method', async () => {
    mockCommentsModel.create = jest.fn(() => {
      return 'Create Finish';
    });

    const createCommentParams = {
      userId: 1,
      pinId: 1,
      content: 'createContent',
    };

    const createCommentData = await commentRepository.createComment(
      createCommentParams.userId,
      createCommentParams.pinId,
      createCommentParams.content
    );

    expect(createCommentData).toBe('Create Finish');

    expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

    expect(mockCommentsModel.create).toHaveBeenCalledWith({
      userId: createCommentParams.userId,
      pinId: createCommentParams.pinId,
      content: createCommentParams.content,
    });
  });
  test('Comment Repository FindById method', async () => {});

  test('Comment Repository destroy method', async () => {
    mockCommentsModel.destroy = jest.fn(() => {
      return 'destroy comment';
    });

    const destroyCommentParams = {
      commentId: 1,
    };
    const destroyCommentData = await commentRepository.destroyComment(
      destroyCommentParams.commentId
    );
    /** deletePost의 비즈니스 로직**/
    // 1. postId를 이용해 게시글을 찾고 (PostRepository.findPostById)
    // 2. postId, password를 이용해 게시글을 삭제한다. (PostRepository.deletePost)
    // 3. 해당 Method의 Return 값이 내가 원하는 형태인지 확인한다.

    expect(destroyCommentData).toBe('destroy comment');
    expect(mockCommentsModel.destroy).toHaveBeenCalledTimes(1);

    //더 들어갈것이 없나?
  });
});
