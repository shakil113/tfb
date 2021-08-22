const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const PrizeAmount = sequelize.define('prize', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  position: {
    type:Sequelize.INTEGER, 
  },
  from10to1k: {
    type: Sequelize.INTEGER, 
  },
  from1kto4k: {
    type: Sequelize.INTEGER,
  },
  from5kto9k: {
    type: Sequelize.INTEGER,  
  },
  from10kto20k: {
    type: Sequelize.INTEGER, 
  },
  morethan20k: {
    type: Sequelize.INTEGER, 
  },
 
});



module.exports = PrizeAmount;