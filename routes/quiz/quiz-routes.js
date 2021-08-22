const isAuth = require('../../checkBox/is-auth');
const quizControler = require('../../controllers/quizControler');
const express = require('express');
const router = express.Router();

router.get('/online-quiz-contest', quizControler.getContestHome);

router.get('/online-quiz-contest-guideline', quizControler.getContestGuideline);

router.get('/running-contest',quizControler.getRunningContest);

router.get('/upcoming-contest',quizControler.getUpcommingContest);

router.get('/registration/:contestId',isAuth,quizControler.getContestRegistration);
router.post('/confirm-registration',isAuth,quizControler.postRegistrationConfirm);

router.get('/detail/:contestId',quizControler.getDetailContest);
router.get('/enter-contest/:contestId',isAuth,quizControler.getEnterContest);

router.post('/login-contest',isAuth,quizControler.postLoginContest);

router.get('/quiz/:contestId/',isAuth,quizControler.getStartContest);

router.post('/answer-evaluate',isAuth,quizControler.postAnswerEvaluate);

router.get('/result-card/:contestId',isAuth,quizControler.getViewResultCard);

router.get('/all-contest-results',quizControler.getContestResult);

router.post('/all-contest-results',quizControler.postContestResult);
router.get('/view-result-detail/:contestId',isAuth,quizControler.getViewResultDetail);



module.exports = router;
