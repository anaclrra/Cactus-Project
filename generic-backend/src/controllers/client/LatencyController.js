const logger = require("../../custom/logger");
const latencyService = require("../../service/Latency/LatencyService");

const LatencyController = async (req, res) => {
    try {
      const clients = await latencyService.LatencyService();

      logger.info("successfully fetch customers with latency higher 50ms.");
      res.status(200).json(clients);
    } catch (error) {
      logger.error("Error fetching latency customers with latency higher 50ms: ", error);
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/LatencyController.js";
      }
      throw error;
    }
}

module.exports = {LatencyController}