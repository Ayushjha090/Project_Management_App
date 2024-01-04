const mongoose = require("mongoose");

const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING
  ? process.env.MONGODB_CONNECTION_STRING
  : "";
const databaseName = process.env.MONGODB_DATABASE_NAME
  ? process.env.MONGODB_DATABASE_NAME
  : "";

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
