"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTwitterAuth = setupTwitterAuth;
const passport_1 = __importDefault(require("passport"));
const passport_twitter_1 = require("passport-twitter");
function setupTwitterAuth(consumerKey, consumerSecret, callbackURL, handleUser) {
    passport_1.default.use(new passport_twitter_1.Strategy({
        consumerKey,
        consumerSecret,
        callbackURL,
        includeEmail: true // Optional: to include email in profile
    }, (token, tokenSecret, profile, done) => {
        handleUser(profile);
        return done(null, profile);
    }));
}
