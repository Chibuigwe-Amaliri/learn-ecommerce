const express = require('express');

const authController = require('../controllers/auth');

const { check, body } = require('express-validator/check');

const User = require('../model/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
   '/login',
   
   [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

        body(
            'password',
             'Please enter a password with only numbers and text and at least 5 characters.'
        )
        .isLength({min: 5})
        .isAlphanumeric()
        .trim(),
   ],

    authController.postLogin
);

router.post(
    
    '/signup', 
    [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            /*if(value === '') {
                throw new Error('Is forbidden to signup without email')
            }
            return true;*/
            return User.findOne({ email: value })
            .then(userDoc => {
              if (userDoc) {
                return Promise.reject(
                    'E-Mail exists already, please pick a different one.'
                );
              }
            });
            //end
        })
        .normalizeEmail(),
        body(
            'password',
             'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({min: 5})
            .isAlphanumeric()
            .trim(),

        body('confirmPassword')
            .trim()
            .custom((value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error('Password does not match');
                }
                return true;
            })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;