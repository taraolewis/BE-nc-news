const {
  fetchCommentsFromArticleID,
  addCommentByID,
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
