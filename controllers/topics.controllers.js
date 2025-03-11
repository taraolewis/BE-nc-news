const { fetchTopics } = require("../models/topics.models");

exports.getTopics = (request, response) => {
  fetchTopics().then((topics) => {
    response.status(200).send({ topics: topics });
  });
};
