const {
  fetchArticlesbyId,
  fetchArticles,
  fetchArticleComments,
  insertArticle,
} = require("../models/articles-model.js");
const { fetchTopicBySlug } = require("../models/topics-model.js");

exports.getArtclesbyId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesbyId(article_id, req.query)
    .then(([article]) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  if (!topic) {
    fetchArticles(sort_by, order, topic)
      .then((articles) => {
        res.status(200).send({ articles: articles });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    fetchTopicBySlug(topic)
      .then(() => {
        return fetchArticles(sort_by, order, topic);
      })
      .then((articles) => {
        res.status(200).send({ articles: articles });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([article_id, fetchArticlesbyId(article_id, {})])
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
exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  const votes = body.inc_votes;
  insertArticle(article_id, votes)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
