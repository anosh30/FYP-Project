const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  host: "localhost", // Replace with your database host
  user: "postgres", // Replace with your PostgreSQL username
  password: "123", // Replace with your PostgreSQL password
  database: "classmate", // Replace with your PostgreSQL database name
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
