const passport = require('passport');
const Usermodel = require('../models/user.model');
const getRandomColor = require('../utils/getColor');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email'], // Add the necessary scopes here
}, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if a user with the given googleId already exists
      let user = await Usermodel.findOne({ googleId: profile.id });

      if (!user) {
        // Check if a user with the same email already exists
        user = await Usermodel.findOne({ email: profile.emails[0].value });

        if (user) {
          // If a user with the email exists, update their googleId
          user.googleId = profile.id;
          await user.save();
        } else {
          // If neither googleId nor email exists, create a new user
          user = await Usermodel.create({
            googleId: profile.id,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            profilePhoto: profile.photos[0].value,
            bgcolor: getRandomColor(),
          });
        }
      }

      // Log the user in
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



const GitHubStrategy = require('passport-github2').Strategy; // Ensure you're importing the correct strategy
require('dotenv').config(); // Make sure to load your environment variables

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Fetch email from profile if available
        const email = (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null;

        // Log the profile and email for debugging
        console.log('Profile:', profile);
        console.log('Email:', email);

        let user = await Usermodel.findOne({ githubId: profile.id });
        if (!user) {
            user = await Usermodel.create({
                githubId: profile.id,
                name: profile.displayName || profile.username,
                email: email, // Email can be null
                profilePhoto: profile.photos[0]?.value, // Make sure to safely access photos
            });
        }
        done(null, user);
    } catch (error) {
        console.error('Error during user creation:', error);
        done(error, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
