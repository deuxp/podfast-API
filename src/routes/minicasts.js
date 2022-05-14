const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (_req, res) => {
    const Q = `SELECT minicasts.id, audio_link, banner_link, title, description, minicasts.created_at, user_id, avatar_link, handle
    FROM minicasts
    JOIN users ON minicasts.user_id = users.id
    ORDER BY minicasts.created_at DESC
    limit 10`;

    db.query(Q)
      .then((data) => {
        return res.json(data.rows);
      })
      .catch((e) => {
        res.send(e.message);
      });
  });

  router.post("/upload", (req, res) => {
    const { bannerURL, minicastURL, title, description, category } = req.body; //TODO user_id is hardcoded as 1
    const user_id = "1";
    const Q = `INSERT INTO minicasts (user_id, audio_link, banner_link, title, description, category)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    // console.log("\n\n\n", title);
    db.query(Q, [
      user_id,
      minicastURL,
      bannerURL,
      title,
      description,
      category,
    ]).then(() => {
      res.status(201).send("Ay ok!");
    });
  });

  router.delete("/:id/destroy", (req, res) => {
    const { id } = req.params;
    const Q = `DELETE FROM minicasts
    WHERE id = $1;`;
    db.query(Q, [id]).then(() => {});
    res.json({ status: 204, statusText: `minicast #${id} is destroyed` });
  });

  return router;
};
