"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGitHubAuth = setupGitHubAuth;
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
function setupGitHubAuth(clientID, clientSecret, callbackURL, handleUser) {
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID,
        clientSecret,
        callbackURL,
    }, (accessToken, // Add type for accessToken
    refreshToken, // Add type for refreshToken
    profile, // Use the imported GitHubProfile type
    done // Type for done callback
    ) => {
        handleUser(profile);
        return done(null, profile);
    }));
}
