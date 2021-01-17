// ! Import database
const knex = require("../db");

// ! Retrieve all citizens "census_learn_sqlAll"
exports.census_learn_sqlAll = async (req, res) => {
  //!***
  var column = req.query.column;
  //!***

  // Get all citizens from database
  // SELECT education, AVG(age), COUNT(*) FROM census_learn_sql GROUP BY education
  knex
    .select(
      `${column}`,
      knex.raw("AVG(age) as avg_age"),
      knex.raw("COUNT(*) as count")
    )
    .from("census_learn_sql") // from 'census_learn_sql' table
    .whereNotNull("age")
    .groupBy(`${column}`)
    .orderBy("count", "desc")
    .then((userData) => {
      // Send citizens extracted from database in response
      console.log(column);
      res.json(userData);
      // res.send(req.param);
      // res.json(req.param);
    })
    .catch((err) => {
      // Send error message in response
      res.json({
        message: `There was an error retrieving all citizens : ${column} ${err}`,
      });
    });
};
