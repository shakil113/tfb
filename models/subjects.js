const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const Subjects = sequelize.define( 'subject', {


    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
       
      },
      subjectName:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true

      },
      part:{
        type: Sequelize.INTEGER,
      },
      for:{
        type: Sequelize.STRING,
        allowNull: false
      }

});



module.exports = Subjects;