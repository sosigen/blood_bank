const express = require('express');
const router = new express.Router();
router.use(express.json());
const sendQuery = require('../utils/sendQuery');

//get donations
router.get('/api/donations/all', (req, res) => {
	const getDonationsQuery = `SELECT donation_id, DATE_FORMAT(donation_date,'%d/%m/%Y'), quantity, donor_id FROM donations`;
	sendQuery(res, getDonationsQuery);
});

//update donation by ID
router.patch('/api/donations/:donationID', (req, res) => {
	const updatedonationQuery = 'UPDATE donations SET ? WHERE donation_id=?';
	sendQuery(res, updatedonationQuery, [req.body, req.params.donationID]);
});

//delete donation by ID
router.delete('/api/donations/:donationID', (req, res) => {
	const deletedonationQuery = 'DELETE FROM donations WHERE donation_id=?';
	sendQuery(res, deletedonationQuery, [req.params.donationID]);
});

//add new donation
router.post('/api/donations', (req, res) => {
	//`donation_id`, `donation_date`, `quantity`, `donation_id`
	const addDonationQuery =
		'INSERT INTO donations(donation_date, quantity, donor_id) VALUES(?, ?, ?)';
	sendQuery(res, addDonationQuery, Object.values(req.body));
});
router.get('/api/donations/sum', (req, res) => {
	const sumDonationsQuery =
		'SELECT donors.blood_type AS blood_type, SUM(quantity) FROM donations INNER JOIN donors ON donations.donor_id = donors.donor_id GROUP BY blood_type';
	sendQuery(res, sumDonationsQuery);
});
module.exports = router;
