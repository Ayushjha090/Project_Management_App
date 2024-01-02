require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Hello there!");
});

app.listen(port, () => {
  console.log(`Server is up and runnning on port:${port}`);
});
