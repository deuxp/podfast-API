require("dotenv").config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, collection } = require("firebase/firestore");
const {
  getStorage,
  getStream,
  getDownloadURL,
  getMetadata,
  ref,
} = require("firebase/storage");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // access req.body

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

/* ---------------------------- firebase services --------------------------- */
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // connection to the db object
const storage = getStorage();

/* -------------------------------- testGet2 -------------------------------- */

const getUser = () => {
  return new Promise((resolve, reject) => {
    resolve(doc(db, "users", "lmKhbyqPDL4ttyTNxsM6"));
  });
};

// step: 1 create reference

//step: 2

/* -------------------------------- endpoint -------------------------------- */
// return the return of getdownloadurl
app.get("/", (req, res) => {
  const gsReference = ref(
    storage,
    "gs://podfast-432ab.appspot.com/recordings/dc1.mp3"
  );
  getDownloadURL(gsReference).then((url) => {
    res.send(url);
  });
});
// app.get("/", (req, res) => {
//   getUser()
//     .then((docRef) => {
//       return getDoc(docRef);
//     })
//     .then((docSnap) => {
//       res.send(docSnap.data());
//     })
//     .catch((e) => {
//       res.send(e.message);
//     });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
