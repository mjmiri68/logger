const express = require('express');
const Log = require('../models/Log');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const { service, level, message, meta } = req.body;
  
      // اعتبارسنجی ورودی‌ها
      if (!service || !level || !message) {
        return res.status(400).json({ error: 'Service, level, and message are required' });
      }
  
      // ایجاد و ذخیره لاگ
      const newLog = new Log({ service, level, message, meta });
      await newLog.save();
  
      res.status(201).json({ message: 'Log saved successfully' });
    } catch (error) {
      console.error('Error saving log:', error);
      res.status(500).json({ error: 'Failed to save log' });
    }
  });

  router.get('/dashboard', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
  
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.render('dashboard', { logs, user: req.session.user });
  });
    
module.exports = router;
