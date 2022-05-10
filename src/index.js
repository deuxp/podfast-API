require("dotenv").config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const morgan = require("morgan");
// const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieSession = require("cookie-session");

const { Pool } = require("pg");
const { params } = require("./db/config");
const db = new Pool(params);
db.connect();

const app = express();
// console.log(__dirname);
app.use(express.static("public"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // access req.body
app.use(cookieSession({ name: "session", secret: "pineapple" }));
app.use(fileUpload({ createParentPath: true }));
app.use(morgan("dev"));
// app.use(helmet());

/* --------------------------------- ROUTES --------------------------------- */
const minicasts = require("./routes/minicasts");
const users = require("./routes/users");

/* --------------------------------- ROUTES --------------------------------- */
app.use("/minicasts", minicasts(db));
app.use("/users", users(db));

app.get("/", (req, res) => {
  res.send("podfast network");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
