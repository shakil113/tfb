const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const HscMCQpractice = sequelize.define( 'hscmcqpractice', {


    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
       
      },

    chapter:{
        type: Sequelize.STRING,
        
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



module.exports = HscMCQpractice;