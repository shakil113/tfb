const Sequelize = require('sequelize');

const sequelize = new Sequelize('tutozpsp_tfb','root','', {
  
  host: 'localhost',
  dialect: 'mysql',
  
});

module.exports = sequelize;
