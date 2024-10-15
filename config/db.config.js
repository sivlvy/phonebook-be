// db/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_PASSWORD, DATABASE_URL } =
  process.env;

const sequelize = new Sequelize(DATABASE_URL);

module.exports = sequelize;
