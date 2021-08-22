const sequelize = require('../util/database');
const Sequelize = require('sequelize');


const ConstestRegistration = sequelize.define('contestregistration', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  paymentNumber:{
    type:Sequelize.STRING,
    allowNull: false
  },
  transactionId:{
    type:Sequelize.STRING,
    allowNull: false
  }
 

});

module.exports = ConstestRegistration;