const express = require('express');
const sendQuery = require('../utils/sendQuery');
const router = new express.Router();
router.use(express.json());

//add new recipient
//`donor_id`, `forename`, `surname`, `email`, `phone`, `blood_type`
router.post('/api/recipients', (req, res) => {
	const addRecipientQuery = 'INSERT INTO recipients VALUES(null, ?,?,?,?,?)';
	sendQuery(res, addRecipientQuery, ...Object.values(req.body));
});

// get every recipient
router.get('/api/recipients/all', (req, res) => {
	const getRecipientsQuery = 'SELECT * FROM recipients';
	sendQuery(res, getRecipientQuery);
});
// get recipient by ID
router.get('/api/recipients/:recipientID', (req, res) => {
	const getRecipientQuery = 'SELECT * FROM recipients WHERE recipient_id=?';
	sendQuery(res, getRecipientQuery, [req.params.recipientID]);
});

//update recipient
router.patch('/api/recipients/:recipientID', (req, res) => {
	const updateRecipientQuery = 'UPDATE recipients SET ? WHERE recipient_id=?';
	sendQuery(res, updateRecipientQuery, [req.body, req.params.recipientID]);
});

//delete recipient
router.delete('/api/recipients/:recipientID', (req, res) => {
	const deleteRecipientQuery = 'DELETE FROM recipients WHERE recipient_id=?';
	sendQuery(res, deleteRecipientQuery, [req.params.recipientID]);
});

module.exports = router;
