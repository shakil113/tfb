const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const practiceHistory = sequelize.define('practicehistory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  practiceName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  totalQuestion:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rightAns:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  wrongAns:{
    type: Sequelize.STRING,
    allowNull: false
  },
  
  notAnswered:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  mark: {
      type: Sequelize.DOUBLE,
      allowNull: false
  },
  time: {
    type: Sequelize.DOUBLE,
    allowNull: false
}

  
 

});

module.exports = practiceHistory;