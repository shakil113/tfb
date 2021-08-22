const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const ContestType = sequelize.define( 'contesttype', {


    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
       
      },
      contestTypeName:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      eligiblity:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      contestTypeDuration:{
        type: Sequelize.INTEGER,
        allowNull: false,     
      },
      
      questionQuantity:{
          type: Sequelize.INTEGER,
          allowNull: false
      },
      easyQuestionQuantity:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      standardQuestionQuantity:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hardQuestionQuantity:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      markPerRightAns:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      minusPerWrongAns:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      contestAbout:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      subjectIds:{
        type: Sequelize.STRING,
        allowNull: false
      }

    
   

});



module.exports = ContestType;