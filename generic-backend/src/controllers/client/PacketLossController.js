const logger = require("../../custom/logger");
const packetLossService = require("../../service/PacketLoss/PacketLossService");

const PacketLossController = async(req, res) => {
    try {
      const clients = await packetLossService.PacketLossService();

      logger.info("successfully fetch customers with max packet loss");
      res.status(200).json(clients);
    } catch (error) {
      logger.error("Error fetching customers with max packet loss:", error);
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/PacketLossController.js";
      }
      throw error;
    }
}

module.exports = {PacketLossController}