const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const HscModelQuestionNo = sequelize.define( 'hscmodelquestionanswer', {


    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
       
      },
      question:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      mark:{
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      
     
      answer:{
          type: Sequelize.TEXT,
          allowNull: false

      },
      answerImg:{
        type: Sequelize.STRING,    

    }

});



module.exports = HscModelQuestionNo;