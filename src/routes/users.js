const express = require("express");
const router = express.Router();

// `db` would be the firebase
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.send("wuddup");
  });

  return router;
};
