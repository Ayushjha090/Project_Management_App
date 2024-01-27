// Importing dotenv package for accessing environment variables
require("dotenv").config();

// Importing express
const express = require("express");
const cors = require("cors");
const app = express();

// Getting port number from env
const port = process.env.PORT;

// Database connection
const database = require("./config/dbConfig");

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enabling cors for frontend origin only
let corsOrigins = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOrigins));

// API routes
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`The project management backend app is up and running`);
});
