const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.addArticleIDToComments = (commentData, articleData) => {
  const articleObj = {};
  articleData.forEach((article) => {
    articleObj[article.title] = article.article_id;
  });
  return commentData.map((comment) => {
    comment.article_id = articleObj[comment.article_title];
    return comment;
  });
};
