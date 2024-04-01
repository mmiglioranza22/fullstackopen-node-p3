const express = require("express");
const cors = require("cors");
const router = require("./router");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
