const db = require("../db/connection");

exports.fetchCommentsFromArticleID = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return db
        .query(
          `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id, articles.title AS article_title
        FROM comments
        JOIN articles ON comments.article_id = articles.article_id
        WHERE comments.article_id = $1
        ORDER BY comments.created_at DESC;`,
          [article_id]
        )
        .then(({ rows }) => {
          return rows;
        });
    });
};
