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
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return rows[0];
    });
};

exports.fetchAllArticles = (sort_by, order) => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.author, articles.topic, 
    articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.comment_id):: INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateArticleVotesByID = ({ inc_votes }, article_id) => {
  const values = [inc_votes, article_id];

  return db
    .query(
      `UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
    `,
      values
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
