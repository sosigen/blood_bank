const express = require("express");
const sendQuery = require("../utils/sendQuery");
const router = new express.Router();
router.use(express.json());

//add new donor
//`donor_id`, `forename`, `surname`, `email`, `phone`, `blood_type`
router.post("/api/donors", (req, res) => {
  const addRecipientQuery = "INSERT INTO donors VALUES(null, ?,?,?,?,?)";
  sendQuery(res, addRecipientQuery, Object.values(req.body));
});

//get all donors
router.get("/api/donors/all", (req, res) => {
  const getDonorsQuery = "SELECT * FROM donors";
  sendQuery(res, getDonorsQuery);
});

//get donor by ID
router.get("/api/donors/:donorID", (req, res) => {
  const getDonorsQuery = "SELECT * FROM donors WHERE donor_id=?";
  sendQuery(res, getDonorsQuery, [req.params.donorID]);
});
//update donor by ID
router.patch("/api/donors/:donorID", (req, res) => {
  const updateDonorQuery = "UPDATE donors SET ? WHERE donor_id=?";
  sendQuery(res, updateDonorQuery, [req.body, req.params.donorID]);
});

//delete donor by ID
router.delete("/api/donors/:donorID", (req, res) => {
  const deleteDonorQuery = "DELETE FROM donors WHERE donor_id=?";
  sendQuery(res, deleteDonorQuery, [req.params.donorID]);
});

router.get("/api/donors/ranking", (req, res) => {
  const getRankingQuery = "SELECT * from donors_ranking";
  sendQuery(res, getRankingQuery);
});

module.exports = router;
