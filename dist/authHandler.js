"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuth = configureAuth;
const googleStrategy_1 = require("./googleStrategy");
const githubStrategy_1 = require("./githubStrategy");
const facebookStrategy_1 = require("./facebookStrategy");
const twitterStrategy_1 = require("./twitterStrategy");
const linkedinStrategy_1 = require("./linkedinStrategy");
function configureAuth(options) {
    switch (options.strategy) {
        case 'google':
            (0, googleStrategy_1.setupGoogleAuth)(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
            break;
        case 'github':
            (0, githubStrategy_1.setupGitHubAuth)(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
            break;
        case 'facebook':
            (0, facebookStrategy_1.setupFacebookAuth)(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
            break;
        case 'twitter':
            (0, twitterStrategy_1.setupTwitterAuth)(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
            break;
        case 'linkedin':
            (0, linkedinStrategy_1.setupLinkedInAuth)(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
            break;
        default:
            throw new Error('Unsupported strategy. Please use "google", "github", "facebook", "twitter", or "linkedin".');
    }
}
