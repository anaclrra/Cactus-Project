const logger = require("../../custom/logger");
const responseTimeService = require("../../service/ResponseTime/ResponseTimeService");

const ResponseTimeController = async (req, res) => {
    try {
      const clients = await responseTimeService.responseTimeService();

      logger.info("successfully fetching client improvement data.");
      res.status(200).json(clients);
    } catch (error) {
      logger.error("Error fetching client improvement data: ", error);
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/ResponseTimeController.js";
      }
      throw error;
    }
}

module.exports = {ResponseTimeController}