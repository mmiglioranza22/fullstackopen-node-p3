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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};
