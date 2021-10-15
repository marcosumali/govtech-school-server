const mysql = require('mysql2/promise');

const {
  HOST,
  USER,
  PASSWORD,
  DATABASE,
} = process.env

const pool  = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});


module.exports = pool;