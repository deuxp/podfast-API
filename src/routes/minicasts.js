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
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "No minicast uploaded",
        });
      } else {
        let minicast = req.files.minicast; // name of input field
        // .mv() method to move the file to elsewhere on the server
        minicast.mv(`./public/minicasts/${minicast.name}`); // uuid for storing purposes, also puts this in the mincast insert - uuid path
        console.log(minicast.name);
        res.send({
          status: true,
          message: "File is uploaded",
          data: {
            name: minicast.name,
            mimetype: minicast.mimetype,
            size: minicast.size,
          },
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  return router;
};
