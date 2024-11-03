"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFacebookAuth = setupFacebookAuth;
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
function setupFacebookAuth(clientID, clientSecret, callbackURL, handleUser) {
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID,
        clientSecret,
        callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email'], // Customize fields as needed
    }, (accessToken, refreshToken, profile, done) => {
        handleUser(profile);
        return done(null, profile);
    }));
}
