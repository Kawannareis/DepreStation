const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'jogo_usuarios',
  port: 3306
});

module.exports = pool.promise();
