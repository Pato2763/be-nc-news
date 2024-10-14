const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");
const { getEndpoints } = require("./controllers/endpoints-controller.js");

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "route not found" });
});
module.exports = app;
