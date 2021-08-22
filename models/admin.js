const sequelize = require('../util/database');
const Sequelize = require('sequelize');
const Admin = sequelize.define('admin', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type:Sequelize.STRING,
    allowNull: false,
  },
  division: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber:{
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  mail:{
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  }
 

});

module.exports = Admin;