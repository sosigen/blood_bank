const express = require('express');
const router = new express.Router();
router.use(express.json());

//add new donation
router.post('/api/transactions/donation', (req, res) => {
	//`donation_id`, `donation_date`, `quantity`, `donor_id`
	const addDonationQuery =
		'INSERT INTO donations(quantity, donor_id) VALUES(?, ?)';
	sendQuery(res, addDonationQuery, Object.values(req.body));
});

//add new transaction
router.post('/api/transactions/withdraw', (req, res) => {
	//`transaction_id`, `donation_id`, `employee_id`, `transaction_date`, `quantity`, `recipient_id`
	const addTransactionQuery =
		'INSERT INTO transactions(donation_id, employee_id, quantity, recipient_id) VALUES(?,?,?,?)';
	sendQuery(res, addTransactionQuery, Object.values(req.body));
});

module.exports = router;
