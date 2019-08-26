const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node',
  password: '0106781075'
});

module.exports = pool.promise();
