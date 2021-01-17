//! Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

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

//! Implement table route
app.use("/table", tableRouter);

//! Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broker.");
});

//! Implement 404 error route
app.use(function (err, req, res, next) {
  res.status(404).send("Sorry we could note find that.");
});

//! Start express app
app.listen(PORT, function () {
  console.log(`Servier is running on port : ${PORT}`);
});
