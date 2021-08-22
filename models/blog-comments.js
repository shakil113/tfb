const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const BlogComment = sequelize.define('blogcomment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  parentCommentId: {
    type:Sequelize.INTEGER,
    
  },
  comment: {
    type:Sequelize.TEXT,
    allowNull: false,
  },
  like: {
    type: Sequelize.INTEGER,
    
  },
  dislike:{
    type: Sequelize.INTEGER,
   
    
  },
 
 

});

module.exports = BlogComment;