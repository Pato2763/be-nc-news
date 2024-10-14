const { fetchTopics } = require("../models/topics-model.js");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
};
