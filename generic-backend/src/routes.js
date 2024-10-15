const { Router } = require("express");

const latencyController = require("./controllers/client/LatencyController");
const packetLossController = require("./controllers/client/PacketLossController");
const availabilityController = require("./controllers/client/AvailabilityController");
const responseTimeController = require("./controllers/client/ResponseTimeController");
const customersController = require("./controllers/client/CustomersController");

const routes = Router();


routes.get("/customers/latency", latencyController.LatencyController);
routes.get("/customers/packetLoss", packetLossController.PacketLossController);
routes.get("/customers/availability", availabilityController.AvailabilityController);
routes.get("/customers/responseTime",responseTimeController.ResponseTimeController);
routes.get("/customers/count",customersController.CustomersController);

module.exports = routes;
