const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '0106781075', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
