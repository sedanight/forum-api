/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class ThreadCommentRepository {
  async addComment(userId, threadId, content) {
    throw new Error('THREAD_COMMENT_REPOSITORY.ADD_COMMENT_NOT_IMPLEMENTED');
  }

  async deleteComment(id) {
    throw new Error('THREAD_COMMENT_REPOSITORY.DELETE_COMMENT_NOT_IMPLEMENTED');
  }

  async verifyComment(id) {
    throw new Error('THREAD_COMMENT_REPOSITORY.VERIFY_COMMENT_NOT_IMPLEMENTED');
  }

  async verifyCommentOwner(id, userId) {
    throw new Error('THREAD_COMMENT_REPOSITORY.VERIFY_COMMENT_OWNER_NOT_IMPLEMENTED');
  }

  async getCommentsByThread(threadId) {
    throw new Error('THREAD_COMMENT_REPOSITORY.GET_COMMENT_BY_THREAD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadCommentRepository;
