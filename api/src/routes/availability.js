const { Router } = require("express");

// ROUTER CONSULT //
const availability = Router();

// HANDLERS //

const checkAvailabilityController = require("../controllers/checkAvailabilityController.js");

// ROUTES //

availability.get("/availability/:day", checkAvailabilityController);

// EXPORTACION DE RUTAS //
module.exports = availability;
