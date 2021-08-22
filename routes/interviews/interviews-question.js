const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/interview-questions-and-answer', (req, res, next) => {
  res.render('interviews/interview-questions-and-answer', {
   
    path: '/interview-questions-and-answer'
    
  });
});
router.get('/html-interview-questions-and-answer', (req, res, next) => {
  res.render('interviews/html-interview-questions-and-answer', {
   
    path: '/html-interview-questions-and-answer'
    
  });
});

router.get('/javascript-interview-questions-and-answer', (req, res, next) => {

  res.render('interviews/javascript-interview-questions-and-answer', {
    
    path : '/javascript-interview-questions-and-answer'
    
  });
});

module.exports = router;
