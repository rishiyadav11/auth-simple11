"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGoogleAuth = setupGoogleAuth;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
function setupGoogleAuth(clientID, clientSecret, callbackURL, handleUser) {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID,
        clientSecret,
        callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
        handleUser(profile);
        return done(null, profile);
    }));
}
