const CommentService = require('../services/comment.service.js');

let mockCommentsReposirory = {
  createComment: jest.fn(),
  destroyComment: jest.fn(),
};

let commentService = new CommentService();
commentService.commentRepositiry = mockCommentsReposirory;

describe('Layered Architecture Pattern Comments Service Unit Test', () => {
  beforeEach(() => {
    jset.resetAllMocks();
  });

  test('', async () => {});

  test('Comments Service deleteComment Method', async () => {});

  test('Comments Service deleteComment Method By Error', async () => {
    const findCommentByIdReturnValue = {
      userId: 1,
      pinId: 2,
      commentId: 3,
      content: '1234',
      createdAt: new Date('06 October 2011 15  :50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    };
  });
});
