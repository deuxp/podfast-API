// require("dotenv").config();

let params = {};
if (process.env.DATABASE_URL) {
  params.connectionString = process.env.DATABASE_URL;
} else {
  params = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };
}

module.exports = {
  params,
};
