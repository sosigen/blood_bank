const express = require('express');
const router = new express.Router();
const path = require('path');


router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

router.get('/donors', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../public/donors.html'));
});

router.get('/recipients', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../public/recipients.html'));
});

router.get('/donations', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../public/donations.html'));
});

router.get('/transactions', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../public/transactions.html'));
});

module.exports = router;