const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load login credentials from loginParams.json
const loginParamsPath = path.join(process.cwd(), 'public', 'loginParams.json');
const loginParams = JSON.parse(fs.readFileSync(loginParamsPath, 'utf-8'));

// JWT secret key (ideally from .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Authenticate Student Login
const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email matches (with hashed email in loginParams)
        const emailMatches = await bcrypt.compare(email, loginParams.email);
        console.log(emailMatches)
        if (!emailMatches) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches (with hashed password in loginParams)
        const passwordMatches = await bcrypt.compare(password, loginParams.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token if credentials are valid
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    loginStudent,
};
