const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const InterviewQuestion = sequelize.define('interviewquestion', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  questionLevel: {
    type:Sequelize.STRING,
    allowNull: false
  },
  question: {
    type:Sequelize.STRING,
    allowNull: false
  },
  answer: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  example: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  
  
});



module.exports = InterviewQuestion;