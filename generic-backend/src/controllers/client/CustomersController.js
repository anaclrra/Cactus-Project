
const logger = require("../../custom/logger");
const CustomersService = require("../../service/Customer/CustomersService");


const CustomersController = async (req, res) => {
    try {
     const clients = await CustomersService.CustomersService();

     logger.info("successfully fetch count customers ");
     res.status(200).json(clients);
   } catch (error) {
     logger.error("Error fetching count customers:", error);
     if (!error.path) {
       //informa o caminho do erro se não tiver
       error.path = "src/controllers/client/CustomersController.js";
     }
     throw error;
   }
}

module.exports = {CustomersController}