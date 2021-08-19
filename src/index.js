const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
const cors = require("cors");
const donorsRouter = require("./routes/donors");
const recipientsRouter = require("./routes/recipients");
const transactionsRouter = require("./routes/transactions");
const donationsRouter = require("./routes/donations");
const filesRouter = require("./routes/files");

app.use(donorsRouter);
app.use(recipientsRouter);
app.use(transactionsRouter);
app.use(donationsRouter);
app.use(filesRouter);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
