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
