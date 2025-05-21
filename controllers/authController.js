const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv  = require('dotenv');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = new User({ email, password, name, provider: 'local' });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.socialLogin = async (req, res) => {
  try {
    const { socialId, email, name, provider } = req.body;
    if (!socialId || !provider) return res.status(400).json({ error: 'Social ID and provider required' });

    let user = await User.findOne({ socialId, provider });
    if (!user) {
      user = new User({ socialId, email, name, provider });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
