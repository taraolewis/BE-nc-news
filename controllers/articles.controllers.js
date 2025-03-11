const { fetchArticleByID } = require("../models/articles.models");

exports.getArticleByID = (request, response, next) => {
  const { article_id } = request.params;
  console.log("inside controller");

  fetchArticleByID(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
