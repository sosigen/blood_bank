const express = require("express");
const router = new express.Router();
router.use(express.json());
const sendQuery = require("../utils/sendQuery");
//add new transaction
router.post("/api/transactions", (req, res) => {
  //`transaction_id`, `transaction_id`, `employee_id`, `transaction_date`, `recipient_id`
  const addTransactionQuery = "INSERT INTO transactions VALUES(null,?,?,?)";
  sendQuery(res, addTransactionQuery, Object.values(req.body));
});
//get transactions
router.get("/api/transactions/all", (req, res) => {
  const gettransactionsQuery = `SELECT transaction_id, donation_id, DATE_FORMAT(transaction_date,'%d/%m/%Y'), recipient_id FROM transactions`;
  sendQuery(res, gettransactionsQuery);
});

//update donation by ID
router.patch("/api/transactions/:transactionID", (req, res) => {
  const updatetransactionQuery =
    "UPDATE transactions SET ? WHERE transaction_id=?";
  sendQuery(res, updatetransactionQuery, [req.body, req.params.transactionID]);
});

//delete transaction by ID
router.delete("/api/transactions/:transactionID", (req, res) => {
  const deletetransactionQuery =
    "DELETE FROM transactions WHERE transaction_id=?";
  sendQuery(res, deletetransactionQuery, [req.params.transactionID]);
});
module.exports = router;
