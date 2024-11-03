import passport from 'passport';
import { Strategy as LinkedInStrategy, Profile as LinkedInProfile } from 'passport-linkedin-oauth2';

export function setupLinkedInAuth(
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  handleUser: (profile: LinkedInProfile) => void
) {
  passport.use(
    new LinkedInStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ['r_emailaddress', 'r_liteprofile'] // Customize the scope as needed
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: LinkedInProfile,
        done: (error: any, user?: any) => void
      ) => {
        handleUser(profile);
        return done(null, profile);
      }
    )
  );
}
