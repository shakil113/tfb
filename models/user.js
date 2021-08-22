const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstname: {
    type:Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type:Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateofBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  studentType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sscRollNo: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  sscRegiNo: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  sscPassingYear: {
    type: Sequelize.STRING,
    allowNull: false
  },
  division: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  mail:{
    type: Sequelize.STRING,
    
  },
  
  roll:{
    type: Sequelize.STRING,
    allowNull:false,
    unique: true,
  },
 
  password:{
    type: Sequelize.STRING,
    allowNull: false
  }

});



module.exports = User;