const mysql = require("mysql2");

const mysqlHost = process.env.MYSQL_HOST ? process.env.MYSQL_HOST : "localhost";
const mysqlUser = process.env.MYSQL_USER ? process.env.MYSQL_USER : "root";
const mysqlPassword = process.env.MYSQL_PASSWORD
  ? process.env.MYSQL_PASSWORD
  : "password";
const mysqlDatabase = process.env.MYSQL_DATABASE
  ? process.env.MYSQL_DATABASE
  : "project-management";

const connection = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
});

try {
  connection.connect((err) => {
    if (err) {
      console.log("Error connecting database");
      throw err;
    }
    console.log("Successfully connected to MySQL database!");
  });
} catch (error) {
  return;
}

module.exports = connection;
