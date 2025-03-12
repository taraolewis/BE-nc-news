const { fetchCommentsFromArticleID } = require("../models/comments.models");

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
