const express = require("express")
const db = require("../db")

const hashToken = require("../utils/hashToken")

const router = express.Router();
const requireAdmin = require('../middleware/requireAdmin');

router.post("/revoke", requireAdmin, (req, res) => {
  const id = req.body.id;
  if (!id) return res.status(400).json({ error: "id required" })

  const result = db.prepare('UPDATE tokens SET revoked = 1 WHERE id = ?').run(id);

  if (result.changes === 0) {
    return res.status(404).json({error: "not found"})
  }

  res.status(200).json({revoked: true})
})

module.exports = router;
