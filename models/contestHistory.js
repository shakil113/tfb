const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const contestHistory = sequelize.define('contesthistory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
 
  mark: {
      type: Sequelize.DOUBLE,
      allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
}

  
 

});

module.exports = contestHistory;