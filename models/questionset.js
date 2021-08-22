const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const QuestionSet = sequelize.define('questionset', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  questionSet:{
      type: Sequelize.TEXT,
      allowNull: false
  },
  

  
  

});

module.exports = QuestionSet;