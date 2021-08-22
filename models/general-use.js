const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const GeneralUse = sequelize.define('generaluse', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  topic: {
    type:Sequelize.STRING,
    allowNull: false
  },
  for: {
    type:Sequelize.STRING,
    allowNull: false
  },
  
  description: {
    type: Sequelize.TEXT,
    allowNull:false
   
  },
 
 
});



module.exports = GeneralUse;