import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

export function setupTwitterAuth(
  consumerKey: string,
  consumerSecret: string,
  callbackURL: string,
  handleUser: (profile: any) => void
) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey,
        consumerSecret,
        callbackURL,
        includeEmail: true // Optional: to include email in profile
      },
      (token, tokenSecret, profile, done) => {
        handleUser(profile);
        return done(null, profile);
      }
    )
  );
}
