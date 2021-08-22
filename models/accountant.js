const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Accountant = sequelize.define('accountant', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userName:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
},
  phoneNumber:{
    type: Sequelize.STRING,
    allowNull: false
},
password:{
    type: Sequelize.STRING,
    allowNull: false
}
 

});

module.exports = Accountant;