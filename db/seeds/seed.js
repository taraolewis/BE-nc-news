const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, addArticleIDToComments } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics");
    })
    .then(() => {
      return createTopics(topicData);
    })
    .then(() => {
      return createUsers(userData);
    })
    .then(() => {
      return createArticles(articleData);
    })
    .then(({ rows }) => {
      return createComments(commentData, rows);
    });
};

function createTopics(topicData) {
  return db
    .query(
      "CREATE TABLE topics (slug VARCHAR PRIMARY KEY, description VARCHAR NOT NULL, img_url VARCHAR(1000) NOT NULL)"
    )
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const insertQuery = format(
        "INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *",
        formattedTopics
      );
      return db.query(insertQuery);
    });
}

function createUsers(userData) {
  return db
    .query(
      "CREATE TABLE users (username VARCHAR PRIMARY KEY, name VARCHAR NOT NULL, avatar_url VARCHAR(1000))"
    )
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const insertQuery = format(
        "INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *",
        formattedUsers
      );
      return db.query(insertQuery);
    });
}

function createArticles(articleData) {
  return db
    .query(
      "CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title VARCHAR NOT NULL, topic VARCHAR, author VARCHAR, body TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW(), votes INT DEFAULT 0, article_img_url VARCHAR(1000), FOREIGN KEY (topic) REFERENCES topics(slug) ON DELETE CASCADE, FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE)"
    )
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        const newArticle = convertTimestampToDate(article);
        return [
          newArticle.title,
          newArticle.topic,
          newArticle.author,
          newArticle.body,
          newArticle.created_at,
          newArticle.votes,
          newArticle.article_img_url,
        ];
      });
      const insertQuery = format(
        "INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *",
        formattedArticles
      );
      return db.query(insertQuery);
    });
}

function createComments(commentData, articleData) {
  return db
    .query(
      "CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, article_id INT, body TEXT NOT NULL, votes INT DEFAULT 0, author VARCHAR, created_at TIMESTAMP DEFAULT NOW(), FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE, FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE)"
    )
    .then(() => {
      const commentDataWithArticleID = addArticleIDToComments(
        commentData,
        articleData
      );

      const formattedComments = commentDataWithArticleID.map((comment) => {
        const newComment = convertTimestampToDate(comment);
        return [
          newComment.article_id,
          newComment.body,
          newComment.votes,
          newComment.author,
          newComment.created_at,
        ];
      });
      const insertQuery = format(
        `INSERT INTO comments (
        article_id, body, votes, author, created_at
       ) 
       VALUES %L RETURNING *`,
        formattedComments
      );
      return db.query(insertQuery);
    });
}

module.exports = seed;
