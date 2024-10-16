const db = require("../db/connection.js");

exports.insertComment = ({ username, body }, id) => {
  return db
    .query(
      `INSERT INTO comments
        (author,body,article_id)
        VALUES ($1,$2,$3)
        RETURNING *`,
      [username, body, id]
    )
    .then(({ rows }) => {
      const comment = rows[0];
      return comment;
    });
};

exports.removeComment = (id) => {
  return db.query(
    `
    DELETE FROM comments
    WHERE comment_id = $1`,
    [id]
  );
};

exports.fetchComment = (id) => {
  return db
    .query(
      `
    SELECT * FROM comments
    WHERE comment_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid ID" });
      }
      const comment = rows[0];
      return comment;
    });
};
