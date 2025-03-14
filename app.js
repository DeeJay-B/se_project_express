const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const cors = require("cors");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(cors());

module.exports = app;
