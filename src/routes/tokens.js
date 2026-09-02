const express = require("express")
const db = require("../db")

const requireAdmin = require("../middleware/requireAdmin")

const router = express.Router()

router.get("/tokens", requireAdmin, (req, res) => {
  const rows = db
    .prepare("SELECT id, user, site, expires_at, revoked, created_at FROM tokens")
    .all();

  return res.status(200).json(rows);
});

module.exports = router;
