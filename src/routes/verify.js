const express = require('express');
const db = require('../db');
const hashToken = require('../utils/hashToken')

const router = express.Router();

router.get('/verify', (req, res) => {
  const rawToken = req.headers['x-access-token'];

  if (!rawToken) {
    return res.status(401).json({ valid: false, reason: 'no_token' })
  }

  const tokenHash = hashToken(rawToken)

  const requestingSite = req.headers['x-site'];

  const row = db.prepare('SELECT * FROM tokens WHERE token_hash = ?').get(tokenHash);

  if (!row) {
    return res.status(401).json({ valid: false, reason: 'not_found' });
  }

  if (row.revoked) {
    return res.status(401).json({ valid: false, reason: 'revoked' });
  }

  if (row.expires_at && row.expires_at < Math.floor(Date.now() / 1000)) {
    return res.status(401).json({ valid: false, reason: 'expired' });
  }

  // per-site
  //if (row.site && row.site !== requestingSite) {
  //  return res.status(401).json({ valid: false, reason: 'wrong_site' });
  //}

  return res.status(200).json({
    id: row.id,
    valid: true,
    user: row.user,
    site: row.site,
    expiresAt: row.expires_at
  });
});

module.exports = router;
