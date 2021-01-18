//! Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
// const path = require("path");

//! Import routes
const tableRouter = require("./routes/table-route");

//! Set default port for express app
const PORT = process.env.PORT || 4001;

//! Create express app
const app = express();

//! Apply middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//? ************* Test to deploy on heroku // fail cause of SQLite db not supported, must convert to PSQL
//! Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

//! Put all API endpoints under '/table'
app.use("/table", tableRouter);

//! Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broken.");
});

//! Implement 404 error route
app.use(function (err, req, res, next) {
  res.status(404).send("Sorry we could note find that.");
});

//! Start express app
app.listen(PORT, function () {
  console.log(`Servier is running on port : ${PORT}`);
});
