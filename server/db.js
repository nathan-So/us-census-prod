//! Import path module
const path = require("path");

//! Get the location of database file
const dbPath = path.resolve(__dirname, "db/us-census.db");

//! Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

//! Log data
// knex
//   .select("*")
//   .from("census_learn_sql")
//   .then((data) => console.log("data:", data))
//   .catch((err) => console.log(err));

//! Export the database
module.exports = knex;
