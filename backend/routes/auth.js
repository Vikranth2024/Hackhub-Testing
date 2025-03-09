//auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/signup', async (req, res) => {
  try {
    const { username, email, phone, password, passcode, passphrase } = req.body;

    if (!username || !email || !phone || !password || !passcode || !passphrase) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format. Must be 10 digits.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    if (passcode.length !== 6) {
      return res.status(400).json({ message: 'Passcode must be exactly 6 digits.' });
    }

    if (!Array.isArray(passphrase) || passphrase.length !== 12) {
      return res.status(400).json({ message: 'Passphrase must contain exactly 12 words.' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email or phone already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPasscode = await bcrypt.hash(passcode, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      passcode: hashedPasscode,
      passphrase,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password, passcode } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email/phone or password.' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email/phone or password.' });
    }
    const isPasscodeMatch = await bcrypt.compare(passcode, user.passcode);
    if (!isPasscodeMatch) {
      return res.status(400).json({ message: 'Invalid passcode.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login successful.', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
