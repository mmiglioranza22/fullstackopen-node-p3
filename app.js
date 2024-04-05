const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");
const morgan = require("morgan");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use("/api", router);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
