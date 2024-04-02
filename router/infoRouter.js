const express = require("express");

const phonebook = require("../phonebook.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${phonebook.length ?? 0} people</p>
    <p>${new Date().toString()}</p>`
  );
});

module.exports = router;
