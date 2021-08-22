const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const BcsQuestionBank = sequelize.define( 'bcsquestionbank', {


    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
       
      },

    
    dificulty:{
        type: Sequelize.STRING,
        allowNull: false
    },
   

    question:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    option1:{
        type: Sequelize.STRING,
        allowNull: false
    },
    option2:{
        type: Sequelize.STRING,
        allowNull: false
    },
    option3:{
        type: Sequelize.STRING,
        allowNull: false
    },
    option4:{
        type: Sequelize.STRING,
        allowNull: false
    },
    answer:{
        type: Sequelize.STRING,
        allowNull: false
    }

});



module.exports = BcsQuestionBank;