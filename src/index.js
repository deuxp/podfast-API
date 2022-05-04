require("dotenv").config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// const bodyParser = require("body-parser");

const { Pool } = require("pg");
const { params } = require("./db/config");
const db = new Pool(params);
db.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // access req.body
// app.use(bodyParser.json()); // may not need
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

/* --------------------------------- ROUTES --------------------------------- */
const messages = require("./routes/messages");
/* --------------------------------- ROUTES --------------------------------- */
app.use("/api/messages", messages(db));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
