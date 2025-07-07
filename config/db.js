const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',        // Change to your MySQL host if different
  user: 'root',  // Change to your MySQL username
  password: 'mysql',// Change to your MySQL password
  database: 'code_of_practices', // Change to your database name
});

module.exports = db;