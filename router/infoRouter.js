const express = require("express");
const Person = require("../models/index");

const router = express.Router();

router.get("/", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${persons.length ?? 0} people</p>
        <p>${new Date().toString()}</p>`
      );
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
