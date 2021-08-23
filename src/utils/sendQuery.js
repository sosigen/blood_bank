const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blood_bank",
});
const sendQuery = (res, query, parameters) => {
  db.query(query, parameters, (err, result) => {
    if (err) {
      switch (err.code) {
        case "ER_DUP_ENTRY":
          res.status(409).send();
          break;
        default:
          res.status(500).send(err);
          break;
      }
      console.log(err);
      console.log(parameters);
    } else if (!result) {
      res.status(404).send();
    } else res.send(result);
  });
};
module.exports = sendQuery;
