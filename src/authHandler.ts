import { setupGoogleAuth } from './googleStrategy';
import { setupGitHubAuth } from './githubStrategy';
import { setupFacebookAuth } from './facebookStrategy';
import { setupTwitterAuth } from './twitterStrategy';
import { setupLinkedInAuth } from './linkedinStrategy';

type StrategyOptions = {
  strategy: 'google' | 'github' | 'facebook' | 'twitter' | 'linkedin';
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  handleUser: (profile: any) => void;
};

export function configureAuth(options: StrategyOptions) {
  switch (options.strategy) {
    case 'google':
      setupGoogleAuth(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
      break;
    case 'github':
      setupGitHubAuth(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
      break;
    case 'facebook':
      setupFacebookAuth(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
      break;
    case 'twitter':
      setupTwitterAuth(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
      break;
    case 'linkedin':
      setupLinkedInAuth(options.clientID, options.clientSecret, options.callbackURL, options.handleUser);
      break;
    default:
      throw new Error('Unsupported strategy. Please use "google", "github", "facebook", "twitter", or "linkedin".');
  }
}
