const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const InterviewSubject = sequelize.define('interviewsubject', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  subjectName: {
    type:Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
 
  
});



module.exports = InterviewSubject;