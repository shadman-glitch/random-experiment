/**
 * Vercel Serverless Function: GET /api/products
 * Developed by Agent 5 (Back-End Engineer)
 * Zero Cost - Runs on Vercel Free Tier
 */

const { PRODUCTS_DATA } = require('../js/products-data.js');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, search, sort } = req.query || {};
  let list = [...PRODUCTS_DATA];

  if (category && category !== 'All') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return res.status(200).json({
    success: true,
    count: list.length,
    products: list
  });
};
