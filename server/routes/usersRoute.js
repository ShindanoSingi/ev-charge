const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Validate user input
        const user = await User.findOne({ email });
        if (user) {
            return res.send({
                message: 'Email already exists',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();

        return res.send({
            message: 'User registered successfully',
            success: true,
        });
    }
    catch (error) {
        return res.send({
            message: error.message,
            success: false,
        });
    }
}
);

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.send({
                message: 'User not found',
                success: false,
            });
        }
        // Check if password is correct
        if (req.body.password !== user.password) {
            return res.send({
                message: 'Invalid password',
                success: false,
            });
        }
        // Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.send({
            message: 'User logged in successfully',
            success: true,
            token: token
        });
    } catch (error) {
        return res.send({
            message: 'User not found',
            success: false,
        });
    };
});

// Get current user
router.get('/current-user', authMiddleware, async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (user) {
            return res.send({
                message: 'User fetched successfully',
                success: true,
                user: user,
            });
        }
    } catch (error) {
        return res.send({
            message: 'User not found',
            success: false,
        });
    }
});

module.exports = router;