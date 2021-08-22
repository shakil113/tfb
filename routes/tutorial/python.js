const path = require('path');
const express = require('express');
const rootDir = require('../../util/path');
const router = express.Router();

router.get('/python-programming', (req, res, next) => {

    res.render('tutorial/python/python-programming', {
      
    });
  });

module.exports = router;













module.exports = router;