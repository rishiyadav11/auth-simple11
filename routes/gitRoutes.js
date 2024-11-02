const express = require('express');
const passport = require('passport'); // Ensure you are importing Passport correctly
const router = express.Router();

// GitHub authentication routes
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }) // Use the correct passport instance
);

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/'); // Redirect to your desired route
    }
);

module.exports = router;
