const { insertComment } = require("../models/comments-model.js");

exports.postComment = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;
  insertComment(body, article_id)
    .then((comment) => {
      res.status(201).send({ newComment: comment });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
