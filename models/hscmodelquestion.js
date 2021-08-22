const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const HscModelQuestion = sequelize.define( 'hscmodelquestion', {


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
     
      questionPassage:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
     
      questionImg:{
        type: Sequelize.STRING,
       
      },

});



module.exports = HscModelQuestion;