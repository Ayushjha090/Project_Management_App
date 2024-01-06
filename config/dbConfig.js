const mongoose = require("mongoose");
const { mongodbConnectionString, databaseName } = require("./constants");

// Making connection with database
mongoose.connect(mongodbConnectionString + databaseName);
const mongoDatabase = mongoose.connection;

mongoDatabase.on("error", (error) => {
  console.log("Error connecting databse");
  throw error;
});

mongoDatabase.once("open", () => {
  console.log("Successfully connected to the database");
});

module.exports = mongoDatabase;
