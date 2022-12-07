const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 8000;

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi there");
});

// Connect to DB
connectDB();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
