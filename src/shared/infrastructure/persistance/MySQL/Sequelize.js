const { Sequelize } = require("sequelize");

const {MYSQL_DB, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT} = process.env;

module.exports = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
    //logging: false
});