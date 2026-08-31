const express = require('express');
const db = require('../db');
const hashToken = require('../utils/hashToken');

const router = express.Router();

router.get("/activate", (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.redirect('https://justparrot.me')
  }

  const tokenHash = hashToken(token);
  const row = db.prepare("SELECT * FROM tokens WHERE token_hash = ?").get(tokenHash);

  if (!row) {
    return res.redirect('https://justparrot.me')
  }
  if (row.revoked) {
    return res.redirect('https://justparrot.me')
  }
  if (row.expires_at && row.expires_at < Math.floor(Date.now() / 1000)) {
    return res.redirect('https://justparrot.me')
  }

  res.cookie('access_token', token, {
      domain: '.justparrot.me',
      httpOnly: true,
      secure: true,
      maxAge: row.expires_at
        ? (row.expires_at - Math.floor(Date.now() / 1000)) * 1000
        : 1000 * 60 * 60 * 24 * 30
  });

  const redirectTo = row.site ? `https://${row.site}` : 'https://justparrot.me';
  res.redirect(redirectTo);
})

module.exports = router;
