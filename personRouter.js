const express = require("express");

const db = require("./db.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(db);
});

module.exports = router;
