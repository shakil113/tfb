const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/hsc-final-suggestion', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-final-suggestion', {
      
      path : '/hsc-final-suggestion'
      
    });
  });
  router.get('/hsc-ict-final-suggestion', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-ict-final-suggestion', {
      
      path : '/hsc-ict-final-suggestion'
      
    });
  });

router.get('/hsc-bangla-suggestion-first-paper', (req, res, next) => {

  res.render('hsc/hsc_suggestion/hsc-bangla-suggestion-first-paper', {
    
    path : '/hsc-bangla-suggestion-first-paper'
    
  });
});

router.get('/hsc-bangla-suggestion-second-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-bangla-suggestion-second-paper', {
      
      path : '/hsc-bangla-suggestion-second-paper'
      
    });
  });

  router.get('/hsc-english-suggestion-first-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-english-suggestion-first-paper', {
      
      path : '/hsc-english-suggestion-first-paper'
      
    });
  });
  router.get('/hsc-english-suggestion-second-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-english-suggestion-second-paper', {
      
      path : '/hsc-english-suggestion-second-paper'
      
    });
  });

  router.get('/hsc-biology-suggestion-first-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-biology-suggestion-first-paper', {
      
      path : '/hsc-biology-suggestion-first-paper'
      
    });
  });

  router.get('/hsc-biology-suggestion-second-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-biology-suggestion-second-paper', {
      
      path : '/hsc-biology-suggestion-second-paper'
      
    });
  });

  router.get('/hsc-chemistry-suggestion-first-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-chemistry-suggestion-first-paper', {
      
      path : '/hsc-chemistry-suggestion-first-paper'
      
    });
  });

  router.get('/hsc-chemistry-suggestion-second-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-chemistry-suggestion-second-paper', {
      
      path : '/hsc-chemistry-suggestion-second-paper'
      
    });
  });

  router.get('/hsc-math-suggestion-first-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-math-suggestion-first-paper', {
      
      path : '/hsc-math-suggestion-first-paper'
      
    });
  });

  router.get('/hsc-math-suggestion-second-paper', (req, res, next) => {

    res.render('hsc/hsc_suggestion/hsc-math-suggestion-second-paper', {
      
      path : '/hsc-math-suggestion-second-paper'
      
    });
  });


module.exports = router;
