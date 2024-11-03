"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLinkedInAuth = setupLinkedInAuth;
const passport_1 = __importDefault(require("passport"));
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
function setupLinkedInAuth(clientID, clientSecret, callbackURL, handleUser) {
    passport_1.default.use(new passport_linkedin_oauth2_1.Strategy({
        clientID,
        clientSecret,
        callbackURL,
        scope: ['r_emailaddress', 'r_liteprofile'] // Customize the scope as needed
    }, (accessToken, refreshToken, profile, done) => {
        handleUser(profile);
        return done(null, profile);
    }));
}
