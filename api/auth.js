/**
 * Vercel Serverless Function: POST /api/auth
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

  const { action, email } = req.body || {};

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Generate lightweight mock JWT token
  const payloadBase64 = Buffer.from(JSON.stringify({
    sub: email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7) // 7 days
  })).toString('base64');

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payloadBase64}.mockSignSecured2026`;

  return res.status(200).json({
    success: true,
    token,
    user: {
      email,
      name: email.split('@')[0],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    }
  });
};
