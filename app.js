const express = require("express");
const app = express();
const db = require("./db/connection");
const endpoints = require("./endpoints.json");

const { getEndpoints } = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  handleNonExistantEndpoint,
} = require("./controllers/errors.controllers.js");
const { getArticleByID } = require("./controllers/articles.controllers");

//app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID);

app.all("/*", handleNonExistantEndpoint);

app.use((err, request, response, next) => {
  if (err.status === 404) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  response.status(400).send({ msg: "Bad request" });
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "internal server error" });
});

module.exports = app;
