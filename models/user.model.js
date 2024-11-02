const mongoose = require('mongoose');

const emailValidator = {
    validator: function (v) {
        // Only validate if the email is provided (not null)
        return v == null || /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    },
    message: props => `${props.value} is not a valid email!`
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true, validate: emailValidator }, // Optional and unique
    password: { type: String, required: false }, // Optional for OAuth
    googleId: { type: String, required: false }, // Optional for Google OAuth
    githubId: { type: String, required: false }, // For GitHub OAuth
    profilePhoto: { type: String, required: false }, // Optional
    bgcolor: { type: String, required: false }, // Optional user preference
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a user model from the schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
