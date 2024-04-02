const express = require("express");

const phonebook = require("../phonebook.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(phonebook);
});

router.get("/:id", (req, res) => {
  const person = phonebook.find(
    (person) => person.id === Number(req.params.id)
  );
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  const index = phonebook.findIndex(
    (person) => person.id === Number(req.params.id)
  );
  if (index !== -1) {
    phonebook.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

router.post("/", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).json({ error: "name  is missing" });
  }
  if (!person.number) {
    return res.status(400).json({ error: "number is missing" });
  }
  if (phonebook.find((p) => p.name === person.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
  phonebook.push({ ...person, id: Math.floor(Math.random() * 1000000) });

  res.status(201).json(person);
});

module.exports = router;
