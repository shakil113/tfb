const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/java-programming-tutorial', (req, res, next) => {

    res.render('tutorial/java/java-programming-tutorial', {
      
    });
  });

  router.get('/jdk-jre-jvm-in-java', (req, res, next) => {

    res.render('tutorial/java/jdk-jre-jvm-in-java', {
      
    });
  });

  router.get('/java-installation', (req, res, next) => {

    res.render('tutorial/java/java-installation', {
      
    });
  });


  router.get('/simple-java-programs', (req, res, next) => {

    res.render('tutorial/java/simple-java-programs', {
      
    });
  });


  router.get('/java-variables', (req, res, next) => {
  
    res.render('tutorial/java/java-variables', {
     
    });
    
  });

  router.get('/data-types-in-java', (req, res, next) => {
  
    res.render('tutorial/java/data-types-in-java', {
     
    });
    
  });

  router.get('/keywords-in-java', (req, res, next) => {
  
    res.render('tutorial/java/keywords-in-java', {
     
    });
    
  });

  router.get('/operators-in-java', (req, res, next) => {
  
    res.render('tutorial/java/operators-in-java', {
     
    });
    
  });

  router.get('/if-else-in-java', (req, res, next) => {
  
    res.render('tutorial/java/if-else-in-java', {
     
    });
    
  });

  router.get('/switch-case-in-java', (req, res, next) => {
  
    res.render('tutorial/java/switch-case-in-java', {
     
    });
    
  });
  
  router.get('/loops-in-java', (req, res, next) => {
  
    res.render('tutorial/java/loops-in-java', {
     
    });
    
  });


  router.get('/for-loop-in-java', (req, res, next) => {
  
    res.render('tutorial/java/for-loop-in-java', {
     
    });
    
  });
  
module.exports = router;


