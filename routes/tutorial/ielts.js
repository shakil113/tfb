const path = require('path');
const tutorialControler = require('../../controllers/tutorialControler');
const express = require('express');
const router = express.Router();


//ielts grammer routes
router.get('/grammar-of-ielts', tutorialControler.getIeltsGrammar);
router.get('/present-tense', tutorialControler.getPresentTense);
router.get('/present-tense-exercises', tutorialControler.getPresentTenseExercise);
router.get('/past-tense', tutorialControler.getPastTense);
//router.get('/future-tense', tutorialControler.getFutureTense);












module.exports = router;