const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Nicole2129@localhost:5432/workout-log");

module.exports = sequelize;