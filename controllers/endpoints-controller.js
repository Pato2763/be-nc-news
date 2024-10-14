const { fetchEndpoints } = require("../models/endpoints-model.js");

exports.getEndpoints = (req, res, next) => {
  return fetchEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints: endpoints });
  });
};
