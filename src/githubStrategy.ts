import passport from 'passport';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';

export function setupGitHubAuth(
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  handleUser: (profile: GitHubProfile) => void
) {
  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      (
        accessToken: string, // Add type for accessToken
        refreshToken: string, // Add type for refreshToken
        profile: GitHubProfile, // Use the imported GitHubProfile type
        done: (error: any, user?: any) => void // Type for done callback
      ) => {
        handleUser(profile);
        return done(null, profile);
      }
    )
  );
}
