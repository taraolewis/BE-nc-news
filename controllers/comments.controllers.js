const {
  fetchCommentsFromArticleID,
  addCommentByID,
  removeCommentById,
} = require("../models/comments.models");

exports.getCommentsFromArticleID = (request, response, next) => {
  const { article_id } = request.params;
  fetchCommentsFromArticleID(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (request, response, next) => {
  const { body: commentBody, username } = request.body;
  const { article_id } = request.params;

  if (!commentBody || !username) {
    return response.status(400).send({ msg: "Bad request" });
  }
  addCommentByID(commentBody, username, article_id)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (request, response, next) => {
  const { comment_id } = request.params;

  removeCommentById(comment_id)
    .then((deleteResult) => {
      if (deleteResult.rowCount === 0) {
        return response.status(404).send({ msg: "comment not found" });
      }
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
