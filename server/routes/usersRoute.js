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

module.exports = router;