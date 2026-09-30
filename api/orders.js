/**
 * Vercel Serverless Function: POST /api/orders
 * Developed by Agent 5 (Back-End Engineer)
 * Zero Cost - Runs on Vercel Free Tier
 */

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { customer, items, promoCode } = req.body || {};

  if (!customer || !customer.email || !customer.name || !items || !items.length) {
    return res.status(400).json({
      success: false,
      message: 'Invalid order payload: Missing customer or items'
    });
  }

  // Calculate pricing server-side
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  let discount = 0;
  let freeShipping = false;

  if (promoCode === 'WELCOME20') {
    discount = subtotal * 0.2;
  } else if (promoCode === 'FREESHIP') {
    freeShipping = true;
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping = (subtotal >= 150 || freeShipping) ? 0 : 15;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + shipping + tax;

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomHex = Math.floor(1000 + Math.random() * 9000);
  const orderId = `ORD-${dateStr}-${randomHex}`;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return res.status(201).json({
    success: true,
    orderId,
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name,
      email: customer.email,
      address: customer.address
    },
    itemsCount: items.reduce((sum, i) => sum + i.quantity, 0),
    totals: {
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2))
    },
    estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  });
};
