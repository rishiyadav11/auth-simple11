# auth-simple11

**Created by Rishi Yadav**  
*GitHub: [rishiyadav11](https://github.com/rishiyadav11)*  
*Full Stack Developer*

`auth-simple11` is a lightweight package that simplifies the implementation of OAuth strategies in your application. With a simple function call, you can easily integrate Google, GitHub, Facebook, and LinkedIn authentication.

## Installation

To install the package, run the following command:

```bash
npm install auth-simple11
```

## Environment Variables

Before using the package, you need to set up the following environment variables in your `.env` file:

```plaintext
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>
FACEBOOK_APP_ID=<your_facebook_app_id>
FACEBOOK_APP_SECRET=<your_facebook_app_secret>
LINKEDIN_CLIENT_ID=<your_linkedin_client_id>
LINKEDIN_CLIENT_SECRET=<your_linkedin_client_secret>
CALLBACK_URL=<your_callback_url>  # The URL to which the user will be redirected after authentication
```

Make sure to replace the placeholders with your actual credentials.

## Using a Single Strategy

To implement a single OAuth strategy, you can follow the steps below. This example will demonstrate how to use Google authentication.

### Step 1: Set Up Google Authentication

In your `app.js`, you can set up Google authentication like this:

```javascript
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { setupAuth } from 'auth-simple11';

dotenv.config();
const app = express();

// Initialize passport
app.use(passport.initialize());

// Set up Google OAuth strategy
setupAuth('google', {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (profile) => {
    // Here you can handle the user data returned from Google
    console.log('Google profile:', profile);
    // You can save the user data to your database here
});

// Define the route to initiate authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle the callback after Google has authenticated the user
app.get('/auth/callback', (req, res) => {
    // You can handle the user data after authentication here
    res.redirect('/');
});

// Serve a simple homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the OAuth App</h1><p><a href="/auth/google">Login with Google</a></p>');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Step 2: Run the Application

Start your application with the following command:

```bash
node app.js
```

### Step 3: Test the Google Authentication

Open your browser and navigate to `http://localhost:3000`. Click the "Login with Google" link to initiate the Google authentication flow. After you log in, you will be redirected back to your application.

## Full App Usage Example

Here is a complete example of how to use the `auth-simple11` package in an Express application:

```javascript
// app.js
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { setupAuth } from 'auth-simple11';

dotenv.config();
const app = express();

// Initialize passport
app.use(passport.initialize());

// Set up OAuth strategies
setupAuth('google', {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (profile) => {
    console.log('Google profile:', profile);
});

setupAuth('github', {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (profile) => {
    console.log('GitHub profile:', profile);
});

setupAuth('facebook', {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (profile) => {
    console.log('Facebook profile:', profile);
});

setupAuth('linkedin', {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (profile) => {
    console.log('LinkedIn profile:', profile);
});

// Define routes for authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/linkedin', passport.authenticate('linkedin'));

// Handle callbacks
app.get('/auth/callback', (req, res) => {
    res.redirect('/');
});

// Serve a simple homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the OAuth App</h1><p><a href="/auth/google">Login with Google</a></p><p><a href="/auth/github">Login with GitHub</a></p><p><a href="/auth/facebook">Login with Facebook</a></p><p><a href="/auth/linkedin">Login with LinkedIn</a></p>');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

This README file contains all the necessary information in a single document, including installation instructions, environment variable setup, usage examples, and a complete application example using the `auth-simple11` package. You can copy and upload this file as needed!