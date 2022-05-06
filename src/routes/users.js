const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // async library, so use async for post callback and await for bcrypt
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  // testing - debugging
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`).then((users) => {
      res.json(users.rows);
    });
  });

  // create user
  router.post("/", async (req, res) => {
    const { name, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(`INSERT INTO users (name, password) VALUES ($1, $2)`, [
        // <------------- this query will change when the db is built
        name,
        hashedPassword,
      ]);
      res.status(201).send();
    } catch (error) {
      res.status(500).send();
    }
  });

  // authentication
  router.post("/login", (req, res) => {
    const { name, password } = req.body;
    db.query(`SELECT * FROM users WHERE name = $1`, [name]).then(
      async (data) => {
        const user = data.rows[0];
        if (!user) {
          return res.send("cannot authenticate the user");
        }
        try {
          const verified = await bcrypt.compare(password, user.password); // returns boolean
          if (verified) {
            // set the session cookie or JWT
            // const accessToken = jwt.sign(
            //   user.id,
            //   process.env.ACCESS_TOKEN_SECRET
            // );

            res.redirect(`/users/${user.id}`);
          } else {
            res.send("no dice");
          }
        } catch (err) {
          res.status(500).send(`not verified ${name}`);
        }
      }
    );
  });

  // may have to change to GET after login form is made and using the browser to auth
  router.post("/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.json({ success: "session, set" });
  });

  return router;
};
