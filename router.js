const express = require("express");
const personRouter = require("./personRouter");

const router = express.Router();

router.use("/person", personRouter);

module.exports = router;
