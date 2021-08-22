const path = require('path');
const express = require('express');
const hscTutorialControler = require('../../controllers/hscTutorialControler');
const router = express.Router();

router.get('/hsc-ict-tutorial',hscTutorialControler.hscIctIntro);
router.get('/hsc-ict-chapter-1', hscTutorialControler.Chapter1);

router.get('/hsc-ict-vip-question-and-answer', hscTutorialControler.vipQuestion);




router.get('/hsc-ict-communication-system-and-networking-part-1', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-communication-system-and-networking-part-1', {
   
    path : '/hsc-ict-communication-system-and-networking-part-1'
    
  });
});
router.get('/hsc-ict-communication-system-and-networking-part-2', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-communication-system-and-networking-part-2', {
   
    path : '/hsc-ict-communication-system-and-networking-part-2'
    
  });
});

router.get('/hsc-ict-communication-system-and-networking-part-3', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-communication-system-and-networking-part-3', {
    
    path : '/hsc-ict-communication-system-and-networking-part-3'
    
  });
});
router.get('/hsc-ict-communication-system-and-networking-part-4', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-communication-system-and-networking-part-4', {
    
    path : '/hsc-ict-communication-system-and-networking-part-4'
    
  });
});
router.get('/hsc-ict-communication-system-and-networking-part-5', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-communication-system-and-networking-part-5', {
   
    path : '/hsc-ict-communication-system-and-networking-part-5'
    
  });
});

router.get('/hsc-ict-communication-system-and-networking-part-6', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-communication-system-and-networking-part-6', {
   
    path : '/hsc-ict-communication-system-and-networking-part-6'
    
  });
});
router.get('/hsc-ict-number-system-and-digital-device-part-1', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-number-system-and-digital-device-part-1', {
    path: '/hsc-ict-number-system-and-digital-device-part-1'
    
  });
});
router.get('/hsc-ict-number-system-and-digital-device-part-2', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-number-system-and-digital-device-part-2', {
    path: '/hsc-ict-number-system-and-digital-device-part-2'
    
  });
});

router.get('/hsc-ict-web-design-and-html-part-1', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-1', {
    path: '/hsc-ict-web-design-and-html-part-1'
    
  });
});
router.get('/hsc-ict-web-design-and-html-part-2', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-2', {
    
    path: '/hsc-ict-web-design-and-html-part-2'
    
  });
});

router.get('/hsc-ict-web-design-and-html-part-3', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-3', {
    
    path: '/hsc-ict-web-design-and-html-part-3'
    
  });
});

router.get('/hsc-ict-web-design-and-html-part-4', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-4', {
   
    path : '/hsc-ict-web-design-and-html-part-4'
    
  });
});

router.get('/hsc-ict-web-design-and-html-part-5', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-5', {
    
    path: '/hsc-ict-web-design-and-html-part-5'
    
  });
});

router.get('/hsc-ict-web-design-and-html-part-6', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-6', {
    
    path: '/hsc-ict-web-design-and-html-part-6'
    
  });
});
router.get('/hsc-ict-web-design-and-html-part-7', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-web-design-and-html-part-7', {
   
    path : '/hsc-ict-web-design-and-html-part-7'
    
  });
});

router.get('/hsc-ict-programming-language-part-1', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-programming-language-part-1', {
    path: '/hsc-ict-programming-language-part-1'
    
  });
});


router.get('/hsc-ict-database-management-system-part-1', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-database-management-system-part-1', {
    path: '/hsc-ict-database-management-system-part-1'
    
  });
});
router.get('/hsc-ict-database-management-system-part-2', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-database-management-system-part-2', {
    path: '/hsc-ict-database-management-system-part-2'
    
  });
});

router.get('/hsc-ict-database-management-system-part-3', (req, res, next) => {

  res.render('hsc/ict/hsc-ict-database-management-system-part-3', {
    path: '/hsc-ict-database-management-system-part-3'
    
  });
});

router.get('/freelancing-and-online-earning', (req, res, next) => {

  res.render('hsc/ict/freelancing-and-online-earning', {
   
    path : '/freelancing-and-online-earning'
    
  });
});

module.exports = router;
