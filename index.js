const express = require('express');
const connectDb = require("./config/db");
const bcrypt = require('bcrypt');
const generateToken = require('./utils/generate_token')
const nodemailer = require('nodemailer');
require('./config/passport'); 
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const crypto = require('crypto');
const Usermodel = require('./models/user.model'); // Importing Usermodel correctly
const getRandomColor = require('./utils/getColor')
const port = 3000;
const app = express();
app.use(express.json());

connectDb();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any other service you are using
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



app.get('/', (req, res) => {
    res.send('Hello World!sd');
});


let tempUserStore = {}; // Temporarily store user details before verification
const otpStore={};
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const checkuser = await Usermodel.findOne({ email: email });
        if (checkuser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        otpStore[email] = otp; // Store OTP temporarily

        // Store temporary user data
        tempUserStore[email] = { name, password }; // Store name and password

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Your OTP is ${otp}`
        });

        // Respond to the client
        res.status(200).json({ msg: 'OTP sent to email. Please verify.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
});


// Route to resend OTP
app.post('/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await Usermodel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Generate a new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        otpStore[email] = otp; // Store OTP associated with the email

        // Send OTP via email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification - New OTP',
            text: `Your new OTP is ${otp}. It will expire in 5 minutes.`
        });

        res.status(200).json({ msg: 'New OTP sent to email. Please verify.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
});



// Change the route to POST
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if the OTP matches
        if (otpStore[email] && otpStore[email] === otp) {
            // Remove OTP from the store after verification
            delete otpStore[email];

            // Retrieve the temporary user data
            const tempUser = tempUserStore[email];
            if (!tempUser) {
                return res.status(400).json({ msg: 'User data not found. Please register again.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(tempUser.password, 10); 

            // Save the user to the database
            const user = await Usermodel.create({
                name: tempUser.name,
                email: email,
                password: hashedPassword,
                bgcolor: getRandomColor() // Or any other logic for bgcolor
            });

            // Remove the temporary user data
            delete tempUserStore[email];

            res.status(201).json({ msg: 'User registered successfully!', user });
        } else {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Use findOne to get a single user
        const user = await Usermodel.findOne({ email: email });
        
        // Check if the user exists
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }
        const token = generateToken(user.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        console.log(token);
        

        res.json({
            msg: "You are logged in",
            token:token,
            user: user // You might want to exclude sensitive info like the password before sending it
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send("Something went wrong!");
    }
});

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/authRoutes'));

// Protected profile route
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }

    console.log(req); // Logs the entire `req` object to the console for inspection

    res.send(`<h1>Welcome, ${req.user.name}</h1>`);
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to profile.
        res.redirect('/profile');
    }
);

app.get('/allusers', async(req, res) => {
    const allusers = await Usermodel.find();
    res.json(allusers);
});
app.use('/',require('./routes/gitRoutes'))




app.listen(port, () => {
    console.log(`listening on ${port}`);
    console.log('http://localhost:3000');
});
