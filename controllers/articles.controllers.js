const {
  fetchArticleByID,
  fetchAllArticles,
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
  fetchAllArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
