const express = require("express");
const Person = require("../models/index");

const router = express.Router();

router.get("/", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

router.get("/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).end();
    });
});

router.delete("/:id", (req, res) => {
  Person.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).end();
    });
});

router.post("/", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).json({ error: "name  is missing" });
  }
  if (!person.number) {
    return res.status(400).json({ error: "number is missing" });
  }
  Person.find({ name: person.name })
    .then((result) => {
      if (result.length > 0) {
        return res.status(400).json({ error: "name must be unique" });
      } else {
        return res.status(404).end();
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).end();
    });

  Person.create(person)
    .then((person) => {
      return res.status(201).json(person);
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).end();
    });
});

module.exports = router;
