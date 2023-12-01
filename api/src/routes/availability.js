const { Router } = require("express");

// ROUTER CONSULT //
const availability = Router();

// HANDLERS //

const handlerCheckAvailability = require("../controllers/checkAvailabilityController.js");

// ROUTES //

availability.get("/availability/:day", handlerCheckAvailability);

// EXPORTACION DE RUTAS //
module.exports = availability;
