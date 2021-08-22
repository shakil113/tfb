const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Account = sequelize.define('account', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date:{
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  cost:{
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  availableTshirt:{
    type: Sequelize.INTEGER,
    
  },
  availableMug:{
    type: Sequelize.INTEGER,
    
  },
  balance:{
    type: Sequelize.DOUBLE,
    
  },
  

});

module.exports = Account;