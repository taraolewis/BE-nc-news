const db = require("../db/connection");

exports.fetchArticleByID = (article_id) => {
  return db
    .query(
      `SELECT articles.*, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return rows[0];
    });
};
exports.fetchAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortColumns = [
    "article_id",
    "created_at",
    "title",
    "votes",
    "author",
    "topic",
  ];
  const validTopics = ["mitch", "cats"];
  if (topic && !validTopics.includes(topic)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const validOrderBy = ["asc", "desc"];
  if (!validOrderBy.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let query = `SELECT articles.article_id,
  articles.title, articles.author, articles.topic,
  articles.created_at, articles.votes, articles.article_img_url,
  COUNT (comments.comment_id)::INT AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id `;
  const queryValue = [];

  if (topic) queryValue.push(topic);
  if (queryValue.length === 1) {
    query += `WHERE articles.topic = $1 `;
  } else if (queryValue.length === 2) {
    query += `AND articles.topic = $2 `;
  }
  query += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  return db.query(query, queryValue).then(({ rows }) => {
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
