const express = require("express")
const db = require("../db")

const crypto = require("crypto")

const hashToken = require("../utils/hashToken")

const router = express.Router();
const requireAdmin = require('../middleware/requireAdmin');

router.post("/issue", requireAdmin, (req, res) => {
  const body = req.body;

  const user = body.user;
  const site = body.site || null;
  const expiresInSeconds = body.expiresInSeconds || null;

  const expiresAt = expiresInSeconds
    ? Math.floor(Date.now() / 1000) + expiresInSeconds
    : null;

  if (!user) {
    return res.status(400).json({ error: "user is required" });
  }

  const insert = db.prepare("INSERT INTO tokens (token_hash, user, site, expires_at) VALUES (?, ?, ?, ?)")

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken)

  const result = insert.run(tokenHash, user, site, expiresAt)
  const id = result.lastInsertRowid;

  res.status(201).json({ id: id, token: rawToken, user, site, expiresAt });
});

module.exports = router;
