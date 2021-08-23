const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blood_bank",
});
const sendQuery = (res, query, parameters) => {
  db.query(query, parameters, (err, result) => {
    if (query.includes("INSERT")) {
      console.log(parameters);
    }
    if (err) {
      res.status(500).send("Wystąpił błąd");
      console.log(err);
      console.log(parameters);
    } else if (!result) {
      res.status(404).send();
    } else res.send(result);
  });
};
module.exports = sendQuery;
