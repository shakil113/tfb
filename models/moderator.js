const sequelize = require('../util/database');
const Sequelize = require('sequelize');



const Moderator = sequelize.define('moderator', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type:Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  }
 

});

module.exports = Moderator;