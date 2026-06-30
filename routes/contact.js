const express = require('express');
const router = express.Router();

let inquiries = [];

router.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  inquiries.push({
    type: 'contact', name, email, phone, message,
    date: new Date().toISOString()
  });
  res.json({ success: true, message: 'Thank you for reaching out. We will get back to you shortly.' });
});

router.post('/home-evaluation', (req, res) => {
  const { name, email, phone, address, propertyType } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  inquiries.push({
    type: 'evaluation', name, email, phone, address, propertyType,
    date: new Date().toISOString()
  });
  res.json({ success: true, message: 'Your home evaluation request has been submitted. We will contact you within 24 hours.' });
});

module.exports = router;
