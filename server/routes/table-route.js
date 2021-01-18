//! Import express
const express = require("express");

//*
// const app = express();
//*

//! Import the table-controller
const tableRoutes = require("../controllers/table-controller");

//! Create router
const router = express.Router();

//! Add route for GET request to retrieve the asked citizens
router.get("/all", tableRoutes.census_learn_sqlAll);

//*
// app.get("/test/", (req, res) => {
//   res.send(req.params.id);
// });
//*

//! Export router
module.exports = router;
