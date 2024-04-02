const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const morgan = require("morgan");
const app = express();
const PORT = 3001;
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use("/api", router);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
