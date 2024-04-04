const express = require("express");

const PersonService = require("../services/person");

const router = express.Router();

router.get("/", (req, res, next) => {
  PersonService.getAll()
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  PersonService.getById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  PersonService.delete(req.params.id)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  const person = req.body;
  PersonService.update(req.params.id, person)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).json({ error: "name  is missing" });
  }
  if (!person.number) {
    return res.status(400).json({ error: "number is missing" });
  }

  PersonService.create(person)
    .then((person) => {
      return res.status(201).json(person);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
