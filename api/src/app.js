const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const server = express();

server.name = "API";
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));

// EXPORTAR ENRUTADOR PRINCIPAL DESDE EL SERVIDOR //
server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
