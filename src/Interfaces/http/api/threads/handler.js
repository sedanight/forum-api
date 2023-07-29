/* eslint-disable no-underscore-dangle */
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyuseCase');
const GetSingleThreadUseCase = require('../../../../Applications/use_case/GetSingleThreadUseCase');
const LikeOrDislikeCommentUseCase = require('../../../../Applications/use_case/LikeOrDislikeCommentUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postThreadCommentHandler = this.postThreadCommentHandler.bind(this);
    this.deleteThreadCommentHandler = this.deleteThreadCommentHandler.bind(this);
    this.addThreadCommentReplyHandler = this.addThreadCommentReplyHandler.bind(this);
    this.deleteThreadCommentReplyHandler = this.deleteThreadCommentReplyHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
    this.likeThreadCommentHandler = this.likeThreadCommentHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { title, body } = request.payload;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const newThread = await addThreadUseCase.execute(userId, { title, body });

    const response = h.response({
      status: 'success',
      data: {
        addedThread: newThread,
      },
    });
    response.code(201);
    return response;
  }

  async postThreadCommentHandler(request, h) {
    const { threadId } = request.params;
    const { id: userId } = request.auth.credentials;
    const { content } = request.payload;

    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const newComment = await addCommentUseCase.execute(userId, threadId, content);

    const response = h.response({
      status: 'success',
      data: {
        addedComment: newComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteThreadCommentHandler(request, h) {
    const { threadId, commentId } = request.params;
    const { id: userId } = request.auth.credentials;

    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    await deleteCommentUseCase.execute(commentId, userId, threadId);

    const response = h.response({
      status: 'success',
      data: {
        status: 'success',
      },
    });
    response.code(200);
    return response;
  }

  async addThreadCommentReplyHandler(request, h) {
    const { threadId, commentId } = request.params;
    const { id: userId } = request.auth.credentials;
    const { content } = request.payload;
    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const addedReply = await addReplyUseCase.execute(userId, threadId, commentId, content);

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteThreadCommentReplyHandler(request, h) {
    const { threadId, commentId, replyId } = request.params;
    const { id: userId } = request.auth.credentials;

    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
    await deleteReplyUseCase.execute(userId, threadId, commentId, replyId);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async getThreadHandler(request, h) {
    const { threadId } = request.params;
    const getSingleThreadUseCase = this._container.getInstance(GetSingleThreadUseCase.name);
    const thread = await getSingleThreadUseCase.execute(threadId);

    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }

  async likeThreadCommentHandler(request, h) {
    const { threadId, commentId } = request.params;
    const { id: userId } = request.auth.credentials;

    const likeOrDislikeCommentUseCase = this._container.getInstance(
      LikeOrDislikeCommentUseCase.name,
    );
    await likeOrDislikeCommentUseCase.execute(userId, commentId, threadId);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
