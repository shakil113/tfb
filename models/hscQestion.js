const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const HscVIPquestion = sequelize.define( 'hscvipquestion', {


    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
       
      },
      chapter:{
          type: Sequelize.STRING,
          allowNull: false,

      },
      question:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionImg:{
        type: Sequelize.STRING,
       
      },
      answer:{
          type: Sequelize.TEXT,
          allowNull: false

      },
      answerImg:{
        type: Sequelize.STRING,    

    }

});



module.exports = HscVIPquestion;