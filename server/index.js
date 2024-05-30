require("dotenv").config({ path: './.env'});
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");
const compression = require("compression");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Config
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());

app.use(mongoSanitize());
app.use(compression());

// Routes
route(app);

// Error handler
app.all("*", (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});

// Server

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
