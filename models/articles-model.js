const db = require("../db/connection.js");

exports.fetchArticlesbyId = (id) => {
  return db
    .query(
      `SELECT * FROM articles
        WHERE article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      if (rows[0] === undefined) {
        return Promise.reject({
          status: 404,
          msg: "No article with given index",
        });
      }
      return rows;
    });
};
exports.fetchArticles = () => {
  return db
    .query(
      `SELECT author,title,article_id,topic,created_at,votes,article_img_url FROM articles
      ORDER BY created_at DESC`
    )
    .then(({ rows }) => {
      const articles = rows;
      const query = `SELECT * FROM comments`;
      return Promise.all([articles, db.query(query)]);
    })
    .then(([articles, response]) => {
      const comments = response.rows;
      return articles.map((article) => {
        article.comment_count = comments.filter((comment) => {
          return comment.article_id === article.article_id;
        }).length;
        return article;
      });
    });
};
