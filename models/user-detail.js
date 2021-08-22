const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const UserDetail = sequelize.define('userdetail', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  currentPoint: {
    type: Sequelize.INTEGER,
  },
  

  payoutMethod: {
    type: Sequelize.STRING,
    allowNull: false
  },
  payoutNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  presentAddress:{
    type: Sequelize.TEXT,
    allowNull: false
},
courierAddress:{
      type: Sequelize.TEXT,
      allowNull: false
  },
  tshirtSize: {
      type: Sequelize.STRING,
      allowNull: false
  },
 

  
 

});

module.exports = UserDetail;