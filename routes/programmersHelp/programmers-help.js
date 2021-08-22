const path = require('path');

const express = require('express');




const router = express.Router();

router.get('/how-to-become-a-good-programmer', (req, res, next) => {

  res.render('programmersHelp/how-to-become-a-good-programmer', {
  
    path : '/how-to-become-a-good-programmer'
    
  });
});
router.get('/online_judges_solved_problems', (req, res, next) => {

    res.render('programmersHelp/online_judges_solved_problems', {
      
      path: '/online_judges_solved_problems'
      
    });
  });

  router.get('/projects', (req, res, next) => {

    res.render('programmersHelp/projects', {
   
      path: '/projects'
      
    });
  });

module.exports = router;
