const {
  insertComment,
  removeComment,
  fetchComment,
} = require("../models/comments-model.js");

exports.postComment = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;
  insertComment(body, article_id)
    .then((comment) => {
      res.status(201).send({ newComment: comment });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  Promise.all([comment_id, fetchComment(comment_id)])
    .then(([comment_id, comment]) => {
      return removeComment(comment_id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
