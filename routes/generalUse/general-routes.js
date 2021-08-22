const express = require('express');
const GeneralUrlController = require('../../controllers/generalUrlControler')
const router = express.Router();

router.get('/about',GeneralUrlController.getAbout);
router.get('/privacy',GeneralUrlController.getPrivacy);
router.get('/faq',GeneralUrlController.getFaq);
router.get('/terms-of-use',GeneralUrlController.getTermsofUser);
router.get('/contact',GeneralUrlController.getContact);
router.get('/become-a-affiliate',GeneralUrlController.getBeAffiliate);

module.exports = router;
