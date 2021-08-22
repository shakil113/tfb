const path = require('path');
const express = require('express');
const rootDir = require('../../util/path');
const router = express.Router();

router.get('/c-programming', (req, res, next) => {

  res.render('tutorial/c/c-programming', {
    
    path : '/c-programming'
    
  });
});

router.get('/how-to-install-code-blocks', (req, res, next) => {

  res.render('tutorial/c/how-to-install-code-blocks', {
    
    path : '/how-to-install-code-blocks'
    
  });
});
router.get('/program-structure-in-c', (req, res, next) => {

    res.render('tutorial/c/program-structure-in-c', {
     
      path : '/program-structure-in-c'
      
    });
  });

  router.get('/basics-of-c-programming-language', (req, res, next) => {

    res.render('tutorial/c/basics-of-c-programming-language', {
      
      path : '/basics-of-c-programming-language'
      
    });
  });
  router.get('/data-types-in-c', (req, res, next) => {

    res.render('tutorial/c/data-types-in-c', {
      
      path: '/data-types-in-c'
      
    });
  });

  router.get('/variable-and-constant-in-c', (req, res, next) => {

    res.render('tutorial/c/variable-and-constant-in-c', {
    
      path : '/variable-and-constant-in-c'
      
    });
  });

  router.get('/input-output-function-in-c', (req, res, next) => {

    res.render('tutorial/c/input-output-function-in-c', {
     
      path : '/input-output-function-in-c'
      
    });
  });
  router.get('/type-casting-in-c', (req, res, next) => {

    res.render('tutorial/c/type-casting-in-c', {
     
      path : '/type-casting-in-c'
      
    });
  });

  router.get('/operator-in-c', (req, res, next) => {

    res.render('tutorial/c/operator-in-c', {
      
      path : '/operator-in-c'
      
    });
  });

  router.get('/flowchart-in-c', (req, res, next) => {

    res.render('tutorial/c/flowchart-in-c', {
     
      path: '/flowchart-in-c'
      
    });
  });

  router.get('/conditional-statement-in-c', (req, res, next) => {

    res.render('tutorial/c/conditional-statement-in-c', {
      
      path : '/conditional-statement-in-c'
      
    });
  });

  router.get('/if-else-statement-in-c', (req, res, next) => {

    res.render('tutorial/c/if-else-statement-in-c', {
      
      path : '/if-else-statement-in-c'
      
    });
  });
  router.get('/switch-statement-in-c-programming', (req, res, next) => {

    res.render('tutorial/c/switch-statement-in-c-programming', {
      
      path : '/switch-statement-in-c-programming'
      
    });
  });

  router.get('/loops-in-c', (req, res, next) => {

    res.render('tutorial/c/loops-in-c', {
      
      path : '/loops-in-c'
      
    });
  });

  router.get('/array-in-c', (req, res, next) => {

    res.render('tutorial/c/array-in-c', {
      
      path : '/array-in-c'
      
    });
  });

  router.get('/string-in-c', (req, res, next) => {

    res.render('tutorial/c/string-in-c', {
     
      path : '/string-in-c'
      
    });
  });
  router.get('/pointers-in-c', (req, res, next) => {

    res.render('tutorial/c/pointers-in-c', {
      
      path : '/pointers-in-c'
      
    });
  });
  router.get('/dynamic-memory-allocation-in-c', (req, res, next) => {

    res.render('tutorial/c/dynamic-memory-allocation-in-c', {
     
      path : '/dynamic-memory-allocation-in-c'
      
    });
  });
  router.get('/function-in-c', (req, res, next) => {

    res.render('tutorial/c/function-in-c', {
     
      path : '/function-in-c'
      
    });
  });  
  router.get('/recursion-in-c', (req, res, next) => {

    res.render('tutorial/c/recursion-in-c', {
     
      path : '/recursion-in-c'
      
    });
  }); 
  router.get('/structures-in-c', (req, res, next) => {

    res.render('tutorial/c/structures-in-c', {
     
      path : '/structures-in-c'
      
    });
  }); 
  router.get('/typedef-in-c', (req, res, next) => {

    res.render('tutorial/c/typedef-in-c', {
     
      path : '/typedef-in-c'
      
    });
  }); 
  router.get('/file-input-output-in-c', (req, res, next) => {

    res.render('tutorial/c/file-input-output-in-c', {
     
      path : '/file-input-output-in-c'
      
    });
  }); 
  router.get('/error-handling-in-c', (req, res, next) => {

    res.render('tutorial/c/error-handling-in-c', {
     
      path : '/error-handling-in-c'
      
    });
  });
  router.get('/how-run-c-code-in-command-prompt', (req, res, next) => {

    res.render('tutorial/c/how-run-c-code-in-command-prompt', {
     
      path : '/how-run-c-code-in-command-prompt'
      
    });
  });

module.exports = router;
