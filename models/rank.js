const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const Rank = sequelize.define('rank', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
 submissionTime:{
      type: Sequelize.INTEGER,
      allowNull: false
  },
  answer:{
    type: Sequelize.TEXT,
    allowNull: false
},
  mark: {
      type: Sequelize.DOUBLE,
      allowNull: false
  },
  rightAns:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  wrongAns:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  notAttempted:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  
 

});

module.exports = Rank;