
const express = require('express');
const adminController = require('../../controllers/adminControler');
const isAuth = require('../../checkBox/admin-auth');
const router = express.Router();


router.get('/admin-login', adminController.getAdminLogin );

router.post('/admin-login', adminController.postAdminLogin );

router.get('/admin-home',isAuth, adminController.getAdminHome );

router.get('/create-moderator',isAuth, adminController.getCreateModerator);
router.post('/create-moderator',isAuth, adminController.postCreateModerator);

router.get('/create-accountant',isAuth, adminController.getCreateAccountant);
router.post('/create-accountant',isAuth, adminController.postCreateAccountant);

router.get('/add-contest-payment',isAuth, adminController.getAddContestPayment);
router.post('/add-contest-payment',isAuth, adminController.postAddContestPayment);

router.get('/add-contest-level',isAuth, adminController.getAddContestLevel);
router.post('/add-contest-level',isAuth, adminController.postAddContestLevel);

router.get('/view-contest-payment',isAuth, adminController.getViewContestPayment);




router.post('/admin-logout',isAuth,adminController.postAdminLogout);


module.exports = router;
