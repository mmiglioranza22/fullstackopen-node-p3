const express = require("express");

const phonebook = require("./phonebook.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(phonebook);
});

module.exports = router;
