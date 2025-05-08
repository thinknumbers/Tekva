const sql = require('mssql');
require('dotenv').config();

console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Debug log

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Removed .replace(...)
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: true, // For Azure SQL
    trustServerCertificate: false,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to Azure SQL Database');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config:', err);
    throw err;
  });

module.exports = {
  sql, poolPromise
}; 