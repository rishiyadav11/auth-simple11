import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export function setupGoogleAuth(
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  handleUser: (profile: any) => void
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        handleUser(profile);
        return done(null, profile);
      }
    )
  );
}
    