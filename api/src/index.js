const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const pool = require("../db.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
