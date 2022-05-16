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

  router.get("/tags", (req, res) => {
    // send the tags
    const Q = `SELECT * FROM tags;`;
    db.query(Q).then((data) => {
      res.json(data.rows);
    });
  });

  //TODO - mucking this up ,, insert the new cast,, return id ,,, insert intot the minicast bridging table with the tag id
  router.post("/upload", (req, res) => {
    const { bannerURL, minicastURL, title, description, tag } = req.body; //TODO user_id is hardcoded as 1
    const user_id = "1";
    const Q = `INSERT INTO minicasts (user_id, audio_link, banner_link, title, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id`;

    const QQ = `INSERT INTO minicast_tags (minicast_id, tag_id)
    VALUES ($1, $2)`;
    db.query(Q, [user_id, minicastURL, bannerURL, title, description])
      .then((data) => {
        const minicast_id = data.rows[0].id;
        console.log("\t\tthis is the minicast id returned: ", minicast_id);
        db.query(QQ, [minicast_id, tag]); //TODO right here
      })
      .then(() => {
        res.status(201).send("Ay ok!");
      })
      .catch((e) => {
        res.status(500).send("the server crashed", e.message);
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
