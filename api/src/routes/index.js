const { Router } = require("express");
const availability = require("./availability");

// ENRUTADOR PRINCIPAL //
const routes = Router();

// RUTAS DEFINIDAS //
routes.use("/", availability);

// EXPORTAR TODAS LAS RUTAS
module.exports = routes;
