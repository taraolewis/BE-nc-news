exports.handleNonExistantEndpoint = (request, response, next) => {
  response.status(404).send({ msg: "Invalid path" });
};
