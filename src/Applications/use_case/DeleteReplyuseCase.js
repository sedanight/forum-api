/* eslint-disable no-underscore-dangle */
class DeleteReplyUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(userId, threadId, commentId, replyId) {
    await this._threadRepository.verifyThread(threadId);
    await this._commentRepository.verifyComment(commentId);
    await this._replyRepository.verifyReply(replyId);
    await this._replyRepository.verifyReplyOwner(replyId, userId);
    return this._replyRepository.deleteReply(replyId);
  }
}

module.exports = DeleteReplyUseCase;
