import passport from 'passport';
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';

export function setupFacebookAuth(
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  handleUser: (profile: FacebookProfile) => void
) {
  passport.use(
    new FacebookStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email'], // Customize fields as needed
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: FacebookProfile,
        done: (error: any, user?: any) => void
      ) => {
        handleUser(profile);
        return done(null, profile);
      }
    )
  );
}
