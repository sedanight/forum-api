function routes(handler) {
  return [
    {
      method: 'GET',
      path: '/threads/{threadId}',
      handler: handler.getThreadHandler,
    },
    {
      method: 'POST',
      path: '/threads',
      handler: handler.postThreadHandler,
      options: {
        auth: 'forum_api_jwt',
      },
    },
    {
      method: 'POST',
      path: '/threads/{threadId}/comments',
      handler: handler.postThreadCommentHandler,
      options: {
        auth: 'forum_api_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/threads/{threadId}/comments/{commentId}',
      handler: handler.deleteThreadCommentHandler,
      options: {
        auth: 'forum_api_jwt',
      },
    },
    {
      method: 'PUT',
      path: '/threads/{threadId}/comments/{commentId}/likes',
      handler: handler.likeThreadCommentHandler,
      options: {
        auth: 'forum_api_jwt',
      },
    },
    {
      method: 'POST',
      path: '/threads/{threadId}/comments/{commentId}/replies',
      handler: handler.addThreadCommentReplyHandler,
      options: {
        auth: 'forum_api_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
      handler: handler.deleteThreadCommentReplyHandler,
      options: {
        auth: 'forum_api_jwt',
      },
    },
  ];
}

module.exports = routes;
