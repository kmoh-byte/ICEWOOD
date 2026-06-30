const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const listingsRouter = require('./routes/listings');
const mortgageRouter = require('./routes/mortgage');
const contactRouter = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.use('/api/listings', listingsRouter);
app.use('/api/mortgage', mortgageRouter);
app.use('/api', contactRouter);

const pages = [
  'index.html', 'buying.html', 'selling.html',
  'about.html', 'contact.html', 'blog.html',
  'mylistings.html', 'mortgage-calculator.html', 'home-evaluation.html',
  'featured.html', 'map-search.html', 'office-listings.html'
];

pages.forEach(page => {
  const route = page === 'index.html' ? '/' : '/' + page.replace('.html', '');
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, page));
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`iceWood REALTY server running at http://localhost:${PORT}`);
});
