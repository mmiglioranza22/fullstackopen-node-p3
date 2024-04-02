const express = require("express");
const personRouter = require("./personRouter");
const infoRouter = require("./infoRouter");

const router = express.Router();

router.use("/persons", personRouter);
router.use("/info", infoRouter);

module.exports = router;
