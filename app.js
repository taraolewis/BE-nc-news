const express = require("express");
const app = express();
const db = require("./db/connection");
const endpoints = require("./endpoints.json");

const { getEndpoints } = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  handleNonExistantEndpoint,
} = require("./controllers/errors.controllers.js");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.all("/*", handleNonExistantEndpoint);

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "internal server error" });
});

module.exports = app;
