const express = require('express');
const router = express.Router();

router.get('/calculate', (req, res) => {
  const { price, downPayment, rate, amortization } = req.query;

  const sanitize = s => String(s || '').replace(/,/g, '');
  const p = Number(sanitize(price)) || 1000000;
  const dp = Number(sanitize(downPayment)) || 200000;
  const annualRate = (Number(sanitize(rate)) || 4.5) / 100;
  const n = (Number(sanitize(amortization)) || 25) * 12;

  const principal = p - dp;
  if (principal <= 0) {
    return res.json({ monthly: 0, total: 0, interest: 0, principal: 0 });
  }

  // Canadian mortgage: semi-annual compounding (legally required in Canada)
  const monthlyRate = Math.pow(1 + annualRate / 2, 2 / 12) - 1;

  const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const mortgageTotal = monthly * n;
  const interest = mortgageTotal - principal;
  const total = mortgageTotal + dp;

  res.json({
    monthly: Number(monthly.toFixed(2)),
    total: Math.floor(total),
    interest: Math.floor(interest),
    principal: Math.round(principal),
    downPayment: dp,
    propertyPrice: p
  });
});

module.exports = router;
