const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// پردازش ثبت‌نام کاربر
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
  
    if (!username || !password || !role) {
      return res.render('register', { error: 'All fields are required' });
    }
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('register', { error: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, role });
      await newUser.save();
      return res.status(200).json({ success: 'User Registerd' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.render('register', { error: 'Failed to register user' });
    }
  });

// صفحه ورود
router.get('/login', (req, res) => {
    res.render('login', { error: null });
  });

// ورود کاربر
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render('login', { error: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.render('login', { error: 'Invalid credentials' });

  req.session.user = user;
  res.redirect('/logs/dashboard');
});

// خروج از سیستم
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
