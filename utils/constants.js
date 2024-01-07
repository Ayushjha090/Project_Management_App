const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING
  ? process.env.MONGODB_CONNECTION_STRING
  : "";

const databaseName = process.env.MONGODB_DATABASE_NAME
  ? process.env.MONGODB_DATABASE_NAME
  : "";

const saltRounds = Number(process.env.PASSWORD_SALT_ROUNDS);

module.exports = { mongodbConnectionString, databaseName, saltRounds };
