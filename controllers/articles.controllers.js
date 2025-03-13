const {
  fetchArticleByID,
  fetchAllArticles,
  updateArticleVotesByID,
} = require("../models/articles.models");

exports.getArticleByID = (request, response, next) => {
  const { article_id } = request.params;

  fetchArticleByID(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (request, response, next) => {
  const { sort_by = "created_at", order = "desc" } = request.query;
  const validSortColumns = [
    "article_id",
    "created_at",
    "title",
    "votes",
    "author",
    "topic",
  ];
  if (!validSortColumns.includes(sort_by)) {
    return response.status(400).send({ msg: "invalid column" });
  }
  if (order !== "asc" && order !== "desc") {
    return response.status(400).send({ msg: "invalid order" });
  }

  fetchAllArticles(sort_by, order)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotesByID = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  if (typeof inc_votes !== "number") {
    return res.status(400).send({ msg: "Bad request" });
  }

  updateArticleVotesByID({ inc_votes }, article_id)
    .then((article) => {
      if (!article) {
        return response.status(404).send({ msg: "article does not exist" });
      }
      response.status(200).send({ article });
    })

    .catch((err) => {
      next(err);
    });
};
