const express = require('express');
const router = express.Router();

const sampleListings = [
  { id: 1, price: 5880000, beds: 5, baths: 6, sqft: 4820, address: '6088 Blundell Road', city: 'Richmond', area: 'Brighouse', province: 'BC', type: 'House', image: 'https://images.unsplash.com/photo-1733431766379-278a43ed0a7e?w=800&q=80', lat: 49.1555, lng: -123.1610, description: 'Luxurious waterfront estate with panoramic ocean views', featured: true },
  { id: 2, price: 4200000, beds: 4, baths: 5, sqft: 3650, address: '1288 W 38th Ave', city: 'Vancouver', area: 'Shaughnessy', province: 'BC', type: 'House', image: 'https://images.unsplash.com/photo-1732721176814-c0bc82db3971?w=800&q=80', lat: 49.2350, lng: -123.1380, description: 'Elegant Shaughnessy residence with manicured gardens', featured: true },
  { id: 3, price: 3500000, beds: 3, baths: 4, sqft: 2800, address: '2188 SW Marine Dr', city: 'Vancouver', area: 'Marpole', province: 'BC', type: 'Condo', image: 'https://images.unsplash.com/photo-1711098256664-d2ea62e6e376?w=800&q=80', lat: 49.2325, lng: -123.1270, description: 'Stunning penthouse with mountain views' },
  { id: 4, price: 2800000, beds: 2, baths: 3, sqft: 2100, address: '1088 Pacific Blvd', city: 'Vancouver', area: 'Yaletown', province: 'BC', type: 'Condo', image: 'https://images.unsplash.com/photo-1722247523785-629e5cac9b3d?w=800&q=80', lat: 49.2730, lng: -123.1200, description: 'Modern waterfront condo in Yaletown' },
  { id: 5, price: 6800000, beds: 6, baths: 7, sqft: 5600, address: '1388 Matthews Ave', city: 'Vancouver', area: 'Point Grey', province: 'BC', type: 'House', image: 'https://images.unsplash.com/photo-1706164971309-fb4785fe6ceb?w=800&q=80', lat: 49.2570, lng: -123.1460, description: 'Grand estate on prestigious Point Grey street', featured: true },
  { id: 6, price: 3200000, beds: 4, baths: 4, sqft: 3100, address: '5888 Dover Cres', city: 'Richmond', area: 'Brighouse', province: 'BC', type: 'House', image: 'https://images.unsplash.com/photo-1727088523302-a2dc1e2cc61c?w=800&q=80', lat: 49.1680, lng: -123.1700, description: 'Stunning riverfront home with private dock' },
  { id: 7, price: 5200000, beds: 5, baths: 6, sqft: 4500, address: '1288 Duchess Ave', city: 'West Vancouver', area: 'British Properties', province: 'BC', type: 'House', image: 'https://images.unsplash.com/photo-1716065145743-62b57bf0d3b8?w=800&q=80', lat: 49.3410, lng: -123.1690, description: 'Spectacular ocean-view estate', featured: true },
  { id: 8, price: 1800000, beds: 2, baths: 2, sqft: 1450, address: '2188 W 1st Ave', city: 'Vancouver', area: 'Kitsilano', province: 'BC', type: 'Condo', image: 'https://images.unsplash.com/photo-1710883727446-0bf5692fd709?w=800&q=80', lat: 49.2690, lng: -123.1500, description: 'Luxury Kitsilano condo with ocean panorama' },
  { id: 9, price: 2450000, beds: 3, baths: 3, sqft: 2300, address: '8888 Granville St', city: 'Vancouver', area: 'Marpole', province: 'BC', type: 'Townhouse', image: 'https://images.unsplash.com/photo-1714177167566-5b447b38f61c?w=800&q=80', lat: 49.2090, lng: -123.1400, description: 'Contemporary townhome in South Granville' },
  { id: 10, price: 7500000, beds: 6, baths: 8, sqft: 6200, address: '1688 Belmont Ave', city: 'Victoria', area: 'Downtown', province: 'BC', type: 'Estate', image: 'https://images.unsplash.com/photo-1726019687858-8e5d15f89ec2?w=800&q=80', lat: 48.4250, lng: -123.3650, description: 'Magnificent oceanfront estate with private beach', featured: true },
  { id: 11, price: 1380000, beds: 3, baths: 2, sqft: 1650, address: '8277 Granville Ave', city: 'Richmond', area: 'Brighouse', province: 'BC', type: 'Townhouse', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', lat: 49.1705, lng: -123.1440, description: 'Modern family townhome near Brighouse station' },
  { id: 12, price: 2200000, beds: 4, baths: 3, sqft: 2500, address: '3851 Selkirk St', city: 'Vancouver', area: 'Marpole', province: 'BC', type: 'House', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', lat: 49.2160, lng: -123.1310, description: 'Renovated family home in Marpole' }
];

function filterListings(query) {
  let results = [...sampleListings];
  if (query.city) results = results.filter(l => l.city.toLowerCase().includes(query.city.toLowerCase()));
  if (query.area) results = results.filter(l => (l.area || '').toLowerCase().includes(query.area.toLowerCase()));
  if (query.minPrice) results = results.filter(l => l.price >= Number(query.minPrice));
  if (query.maxPrice) results = results.filter(l => l.price <= Number(query.maxPrice));
  if (query.beds) results = results.filter(l => l.beds >= Number(query.beds));
  if (query.featured === 'true') results = results.filter(l => l.featured);
  if (query.office === 'true') results = results.filter(l => l.id <= 6);
  if (query.q) {
    const q = query.q.toLowerCase();
    results = results.filter(l => l.address.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || (l.area || '').toLowerCase().includes(q));
  }
  return results;
}

router.get('/search', (req, res) => {
  const results = filterListings(req.query);
  res.json({ source: 'mls', data: { Results: results, Total: results.length } });
});

router.get('/:id', (req, res) => {
  const listing = sampleListings.find(l => l.id === Number(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
});

module.exports = router;
