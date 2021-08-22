const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const ContestentLevel = sequelize.define('contestentlevel', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
 level:{
      type: Sequelize.STRING,
      allowNull: false
  },

  imageUrl: {
      type: Sequelize.STRING,
      
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  entryPoint:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reward:{
    type: Sequelize.INTEGER,
    allowNull: false
  },

  
 

});

module.exports = ContestentLevel;