const path = require('path');
const express = require('express');
const moderatorController = require('../../controllers/moderatorControler');
const isAuth = require('../../checkBox/is-moderator-auth');
const router = express.Router();


router.get('/moderator-login',moderatorController.getModeratorLogin);
router.post('/moderator-login',moderatorController.postModeratorLogin);

router.get('/moderator-profile',isAuth, moderatorController.getModeratorProfile);

router.get('/create-contest',isAuth,moderatorController.getCreateContest);
router.post('/create-contest',isAuth,moderatorController.postCreateContest);

router.get('/create-contest-subjects',isAuth,moderatorController.getCreateContestSubjects);
router.post('/create-contest-subjects',isAuth,moderatorController.postCreateContestSubjects);

router.get('/create-contest-type',isAuth,moderatorController.getCreateContestType);
router.post('/create-contest-type',isAuth,moderatorController.postCreateContestType);

router.get('/view-all-contest',isAuth,moderatorController.getViewContest);
router.post('/update-contest',isAuth,moderatorController.postUpdateContest);
router.get('/set-question/:contestId',isAuth,moderatorController.getSetContestQuestion);


router.post('/set-question',isAuth,moderatorController.postSetContestQuestion);

router.get('/view-all-subjects',isAuth,moderatorController.getViewSubjects);
router.get('/view-all-contest-topics',isAuth,moderatorController.getViewContestTopics);









router.post('/moderator-logout',isAuth,moderatorController.postModeratorLogout);

module.exports = router;




