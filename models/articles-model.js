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
// exports.fetchArticles = () => {
//   return db
//     .query(
//       `SELECT author,title,article_id,topic,created_at,votes,article_img_url FROM articles
//       ORDER BY created_at DESC`
//     )
//     .then(({ rows }) => {
//       const articles = rows;
//       const query = `SELECT * FROM comments`;
//       return Promise.all([articles, db.query(query)]);
//     })
//     .then(([articles, response]) => {
//       const comments = response.rows;
//       return articles.map((article) => {
//         article.comment_count = comments.filter((comment) => {
//           return comment.article_id === article.article_id;
//         }).length;
//         return article;
//       });
//     });
// };

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
