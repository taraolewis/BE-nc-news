const db = require("../db/connection");

exports.fetchArticleByID = (article_id) => {
  return db
    .query(
      `SELECT author, title, article_id, body, topic, created_at, votes, article_img_url 
    FROM articles
    WHERE article_id = $1`,
      [article_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return rows[0];
    });
};

exports.fetchAllArticles = () => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.author, articles.topic, 
    articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.comment_id):: INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      console.log("hello");
      return rows;
    });
};
