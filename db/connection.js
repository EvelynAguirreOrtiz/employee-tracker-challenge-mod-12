const mysql = require('mysql2');

// // Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'H&NsTi0SeEzUR',
    database: 'employee_tracker'
  },
  console.log('Connected to the employee_tracker database.')
);

module.exports = connection;