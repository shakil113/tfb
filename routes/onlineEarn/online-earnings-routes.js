const path = require('path');

const express = require('express');




const router = express.Router();

router.get('/how-to-start-online-earning', (req, res, next) => {

  res.render('onlineEarn/how-to-start-online-earning', {
   
    path: '/how-to-start-online-earning'
    
  });
});

router.get('/from-website', (req, res, next) => {

  res.render('onlineEarn/from-website', {
   
    path: '/from-website'
    
  });
});

router.get('/earn-from-android-app', (req, res, next) => {

  res.render('onlineEarn/earn-from-android-app', {

    path : '/earn-from-android-app'
    
  });
});

router.get('/place-banner-ads', (req, res, next) => {

  res.render('onlineEarn/place-banner-ads', {
    
    path : '/place-banner-ads'
    
  });
});

router.get('/place-reward-video-ads', (req, res, next) => {

  res.render('onlineEarn/place-reward-video-ads', {
    
    path: '/place-reward-video-ads'
    
  });
});

router.get('/place-interstitial-ads', (req, res, next) => {

  res.render('onlineEarn/place-interstitial-ads', {
    
    path: '/place interstial-ads'
    
  });
});

module.exports = router;
