const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (_req, res) => {
    const Q = `SELECT minicasts.id, audio_link, banner_link, title, description, minicasts.created_at as minicast_created_at, user_id, avatar_link, handle, about_me, first_name, last_name, users.created_at
    FROM minicasts
    JOIN users ON minicasts.user_id = users.id
    ORDER BY minicasts.created_at DESC`;

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
    const { bannerURL, minicastURL, title, description, tag, user_id } =
      req.body;
    const Q = `INSERT INTO minicasts (user_id, audio_link, banner_link, title, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id`;

    const QQ = `INSERT INTO minicast_tags (minicast_id, tag_id)
    VALUES ($1, $2)`;

    const Q3_get_newly_posted_minicast_data = `SELECT minicasts.id, audio_link, banner_link, title, description, minicasts.created_at as minicast_created_at, user_id, avatar_link, handle, about_me, first_name, last_name, users.created_at
    FROM minicasts
    JOIN users ON minicasts.user_id = users.id
    WHERE minicasts.id = $1`;

    db.query(Q, [user_id, minicastURL, bannerURL, title, description])
      .then((data) => {
        const minicast_id = data.rows[0].id;
        if (tag) {
          // const minicast_id = data.rows[0].id;
          // console.log("\t\tthis is the minicast id returned: ", minicast_id);
          db.query(QQ, [minicast_id, tag]);
        }
        console.log("~~~~> new post data, minicast_id:", minicast_id);
        return minicast_id;
      })
      .then((id) => {
        return db.query(Q3_get_newly_posted_minicast_data, [id]);
      })
      .then((minicast_data) => {
        // console.log("~~~~> new post data:", minicast_data);
        res.status(201).send({ minicast_data });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send("the server crashed");
      });
  });

  router.delete("/:id/destroy", (req, res) => {
    const { id } = req.params;
    const Q = `DELETE FROM minicasts
    WHERE id = $1;`;
    db.query(Q, [id]).then(() => {
      res.json({ status: 204, statusText: `minicast #${id} is destroyed` });
    });
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const Q = `SELECT minicasts.id, audio_link, banner_link, title, description, minicasts.created_at, user_id, avatar_link, handle
    FROM minicasts
    JOIN users ON minicasts.user_id = users.id
    WHERE minicasts.id = $1`;
    db.query(Q, [id])
      .then((data) => {
        return res.json(data.rows);
      })
      .catch((e) => {
        res.send(e.message);
      });
  });

  return router;
};
