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
      `SELECT
    articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url, articles.votes,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    on articles.article_id = comments.article_id
    GROUP BY articles.article_id, articles.title,articles.topic, articles.author, articles.created_at, articles.article_img_url
    ORDER BY created_at DESC;`
    )
    .then(({ rows }) => {
      return rows.map((row) => {
        row.comment_count = Number(row.comment_count);
        return row;
      });
    });
};
exports.fetchArticleComments = (id) => {
  return db
    .query(
      `SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC`,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.insertArticle = (id, incVotes) => {
  return Promise.all([
    incVotes,
    db.query(
      `
    SELECT article_id, votes FROM articles
    WHERE article_id = $1`,
      [id]
    ),
  ])
    .then(([incVotes, { rows }]) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "invalid ID" });
      }
      const article = rows[0];
      const newVotes = article.votes + incVotes;
      return db.query(
        `
        UPDATE articles
        SET votes = $1
        WHERE article_id = $2
        RETURNING *`,
        [newVotes, article.article_id]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};
