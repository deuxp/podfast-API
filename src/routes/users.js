const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // async library, so use async for post callback and await for bcrypt
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  // testing - debugging
  router.get("/", (req, res) => {
    console.log("-----------------------\n\n", req.body);
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

  // add favorite minicast for user
  router.post("/:userid/faves", (req, res) => {
    const { userid } = req.params;
    const { minicast_id, fave } = req.body;
    const query = `INSERT INTO favourites (user_id, minicast_id, fave)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    db.query(query, [userid, minicast_id, fave])
      .then((result) => {
        console.log('THIS IS RESULT OF FAVE POST', result.rows[0])
      })
      .then(() => {
        res.status(201).send("Ay ok!");
      })
      .catch((e) => {
        res.status(500).send("the server crashed", e.message);
      });
  })

  router.get("/:userid/minicasts/:minicastid/fave", (req, res) => {
    const { userid, minicastid } = req.params;
    const query = `SELECT fave FROM favourites
                   WHERE user_id = $1
                   AND minicast_id =$2
                   ORDER BY favourites.created_at DESC
                   limit 1;`
    db.query(query, [userid, minicastid])
    .then((data) => {
      console.log(data.rows)
      return res.json(data.rows);
    })
    .catch((e) => {
      res.send(e.message);
    });
  })

  // authentication
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("\t\tthis is the email sent: ", email);
    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then(
      async (data) => {
        const user = data.rows[0];
        console.log("\t\t\tuser: ", user);
        if (!user) {
          return res.send("cannot authenticate the user");
        }
        res.status(200).json({ user });
        // try {
        //   const verified = await bcrypt.compare(password, user.password); // returns boolean
        //   if (verified) {
        //     // set the session cookie or JWT
        //     // const accessToken = jwt.sign(
        //     //   user.id,
        //     //   process.env.ACCESS_TOKEN_SECRET
        //     // );

        //     res.redirect(`/users/${user.id}`);
        //   } else {
        //     res.send("no dice");
        //   }
        // } catch (err) {
        //   res.status(500).send(`not verified ${email}`);
        // }
      }
    );
  });

  // may have to change to GET after login form is made and using the browser to auth
  router.post("/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.json({ success: "session, set" });
  });

  router.get("/dashboard", (req, res) => {
    const { id } = req.params;
    console.log("the session id is the user: ", id);

    //TODO remove hard code and use session id
    const Q = `SELECT minicasts.id, user_id, audio_link, banner_link, title, description, minicasts.active, minicasts.created_at
    FROM minicasts
    JOIN users ON minicasts.user_id = users.id
    ORDER BY minicasts.created_at DESC;`;
    db.query(Q)
      .then((data) => {
        const casts = data.rows;
        // console.log(casts);
        res.json(casts);
      })
      .catch((e) => {
        console.log("query did not work", e.message);
        res.send("query did not work");
      });
  });

  return router;
};
