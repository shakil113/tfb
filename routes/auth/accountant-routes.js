
const express = require('express');
const accountantController = require('../../controllers/accountantControler');
const isAuth = require('../../checkBox/accountant-auth');
const router = express.Router();


router.get('/accountant-login', accountantController.getAccountantLogin );

router.post('/accountant-login', accountantController.postAccountantLogin );

router.get('/accountant-home',isAuth, accountantController.getAccountantHome );


router.get('/contest-payment',isAuth, accountantController.getContestPayment);

router.get('/topper/:contestId',isAuth, accountantController.getTopperList);

router.get('/make-payment/:info',isAuth, accountantController.getMakePayment);

router.post('/make-payment',isAuth, accountantController.postMakePayment);

router.post('/payment-clear',isAuth, accountantController.postPaymentClear);






router.post('/accountant-logout',isAuth, accountantController.postAccountantLogout);




module.exports = router;
