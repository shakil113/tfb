const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const BlogPost = sequelize.define('blogpost', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  post: {
    type:Sequelize.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    
  },
  like:{
    type: Sequelize.INTEGER,
   
    
  },
 
 

});

module.exports = BlogPost;