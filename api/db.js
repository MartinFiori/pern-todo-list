const Pool = require("pg").Pool;
require("dotenv").config();
const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_DATABASE,
} = require("./src/utils/config.js");

const pool = new Pool({
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: 5432,
	database: DB_DATABASE,
});

module.exports = pool;
