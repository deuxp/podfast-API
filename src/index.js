require("dotenv").config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");
// const bodyParser = require("body-parser");
// const { Pool } = require("pg");
// const { params } = require("./db/config");
// const db = new Pool(params);
// db.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // access req.body
// app.use(bodyParser.json()); // may not need
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

/* --------------------------------- ROUTES --------------------------------- */
// const messages = require("./routes/messages");
// const users = require("./routes/users");

/* --------------------------------- ROUTES --------------------------------- */
// app.use("/api/messages", messages(db));

/* -------------------------------- firebase -------------------------------- */
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.get("/", (req, res) => {
  res.send(db);
});

/* -------------------------------- firebase -------------------------------- */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
