const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");
const { getEndpoints } = require("./controllers/endpoints-controller.js");
const {
  getArtclesbyId,
  getArticles,
} = require("./controllers/aritcles-controller.js");

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArtclesbyId);

app.get("/api/articles", getArticles);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "route not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
