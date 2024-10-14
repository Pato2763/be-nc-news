const { fetchArticlesbyId } = require("../models/articles-model.js");

exports.getArtclesbyId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesbyId(article_id)
    .then(([article]) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
