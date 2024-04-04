const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.reason === "numberValidator") {
    return response.status(400).send({ error: "Duplicate entry" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: "Minimum allowed length (9)" });
  }

  next(error);
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
