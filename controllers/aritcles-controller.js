const {
  fetchArticlesbyId,
  fetchArticles,
  fetchArticleComments,
} = require("../models/articles-model.js");

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
exports.getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles: articles });
  });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([article_id, fetchArticlesbyId(article_id)])
    .then(([article_id, article]) => {
      return fetchArticleComments(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};
