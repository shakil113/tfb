const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Payout = sequelize.define('payout', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  payoutNumber:{
    type: Sequelize.STRING,
    allowNull: false
  },
  payoutMethod:{
    type: Sequelize.STRING,
    allowNull: false
  },
  transactionId:{
      type: Sequelize.STRING,
      allowNull: false
  },
  prizeAmount:{
      type: Sequelize.INTEGER,
      allowNull: false
  },
  giftIssued:{
    type: Sequelize.DATEONLY,
    allowNull:false
  
  },
  amountReceived:{
    type: Sequelize.BOOLEAN,
    
},
  

});

module.exports = Payout;