const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createTokenForGoogle } = require('../utils/sendToken');
const { signup, login, logout, verifyEmail } = require('../controller/authController');

router.get('/google', passport.authenticate('google', {  scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        createTokenForGoogle(req.user, 200, res); 
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);
router.post('/login', login);
router.get('/logout', logout); 
router.post('/signup', signup);
router.get('/verify-email/:token', verifyEmail);
module.exports = router; 