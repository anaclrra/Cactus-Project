
const logger = require("../../custom/logger");
const availabilityService = require("../../service/Availability/AvailabilityService");


const AvailabilityController = async (req, res) => {
    try {
     const clients = await availabilityService.AvailabilityService();

     logger.info("successfully fetch customers with availability higher 97");
     res.status(200).json(clients);
   } catch (error) {
     logger.error("Error fetching customers with availability higher 97:", error);
     if (!error.path) {
       //informa o caminho do erro se não tiver
       error.path = "src/controllers/client/AvailabilityController.js";
     }
     throw error;
   }
}

module.exports = {AvailabilityController}