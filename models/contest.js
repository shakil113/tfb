const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const Contest = sequelize.define('contest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  contestName:{
      type: Sequelize.STRING,
      allowNull: false
  },
  contestDate:{
      type: Sequelize.DATEONLY,
      allowNull: false
  },
  contestTime:{
      type: Sequelize.TIME,
      allowNull: false
  },

  contestFee:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  
  chapter:{
    type: Sequelize.STRING,
    allowNull:true
  },
  

  contestType:{
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  contestStatus:{
      type: Sequelize.INTEGER,
      allowNull: false
  },
  questionSetStatus:{
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  
  



});

module.exports = Contest;