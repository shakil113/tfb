const express = require('express');
const { body } = require('express-validator');
const userController = require('../../controllers/userControler')
const User = require('../../models/user');
const isAuth = require('../../checkBox/is-auth');
const router = express.Router();



router.get('/signup',userController.getUserSignup);
router.post('/signup',[
    body('firstname','Character Only!')
        .isString()
        .notEmpty()
        .trim(),
        
    body('lastname','Character Only!')
        .isString()
        .notEmpty()
        .trim(),

    body('gender')
        .notEmpty()
        .custom((value,{ req }) => {

            if(!value){
                throw new Error('Select a gender!')
            }
            return true;
            
        }),

    body('dateofbirth')
        .notEmpty()
        .custom((value,{ req }) => {

            if(!value){
                throw new Error('Enter a your Date of birth!')
            }
            return true;
            
        }),
         

    
    body('phoneNumber','Use 11 digit phone')
        .isNumeric()
        .notEmpty()
        .isLength({min:11 , max:11})
        .trim()
        .custom(value => {
            return User.findOne({where:{phoneNumber: value}}).then(userDoc => {
              if (userDoc) {
                return Promise.reject('Phone number already in use!');
              }
            });
          }),

    body('sscroll','Number Only!')
        .isNumeric()
        .notEmpty()
        .isLength({min:6})
        .trim()
        .custom(value => {
            return User.findOne({where:{sscRollNo: value}}).then(userDoc => {
              if (userDoc) {
                return Promise.reject('Roll number already in use!');
              }
            });
          }),

    body('sscregirstration','Number Only!')
        .isNumeric()
        .notEmpty()
        .isLength({min:6})
        .trim()
        .custom(value => {
            return User.findOne({where:{sscRegiNo: value}}).then(userDoc => {
              if (userDoc) {
                return Promise.reject('Registration number already in use!');
              }
            });
          }),

    body('sscyear')
        .notEmpty()
        .custom((value,{ req }) => {

            if(!value){
                throw new Error('Select your ssc passing year!')
            }
            return true;
            
        }),
     body('division')
        .notEmpty()
        .custom((value,{ req }) => {

            if(!value){
                throw new Error('Select your education board!')
            }
            return true;
            
        }),

    body('studentType')
        .notEmpty()
        .custom((value,{ req }) => {

            if(!value){
                throw new Error('Select student type!')
            }
            return true;
            
        }), 
    body('password','Numbers & Characters only and length more than 6!')
        .isAlphanumeric()
        .notEmpty()
        .isLength({min:6})
        .trim(),

    body('confirmPassword')
        .notEmpty()
        .trim()
        .custom((value,{ req }) => {

        if(value !== req.body.password){
            throw new Error('Password not matched!')
        }
        return true;
        
        })
        


        



], userController.postUserSignup);

router.get('/login', userController.getUserLogin );
router.post('/login',[
    body('phoneNumber','Enter 11 digit phone number!')
        .notEmpty()
        .isNumeric()
        .isLength({min:11, max:11})
        .trim(),
    body('password','Enter a valid password')
        .notEmpty()
        .isAlphanumeric()
        .isLength({min:6})
        .trim()   

],userController.postUserLogin);

router.get('/confirm-identity',userController.getCofirmIdentity);

router.post('/confirm-identity', userController.postCofirmIdentity);
router.post('/reset-password', userController.postResetPasswor);

router.post('/logout',isAuth,userController.postUserLogout);

router.get('/profile',isAuth, userController.getUserProfile);
router.get('/contest-history',isAuth, userController.getContestHistory);
router.get('/edit-profile',isAuth, userController.getEditProfile);
router.post('/edit-profile',isAuth, userController.postEditProfile);



module.exports = router;
