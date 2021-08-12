const express = require('express');
const app = express();
const path = require('path');
const port = 5000 || process.env.PORT;
const sendQuery = require('./utils/sendQuery');
const cors = require('cors');
const donorsRouter = require('./routes/donors');
const recipientsRouter = require('./routes/recipients');
const transactionsRouter = require('./routes/transactions');

app.use(donorsRouter);
app.use(recipientsRouter);
app.use(transactionsRouter);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
	console.log(`server is up on port ${port}`);
});

app.get('/', (req, res) => {
	res.sendFile('../public/index.html', { root: __dirname });
});

app.get('/donors', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/donors.html'));
});
