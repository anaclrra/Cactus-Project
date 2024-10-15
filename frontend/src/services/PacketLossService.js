import axios from "axios";

export const PacketLossService = async () => {
    const apiUrl = process.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/customers/packetLoss`);
    
      if (response.status !== 200) { 
        throw new Error('Erro ao obter packetLoss');
      } 
  
      return response.data;
    } catch (error) {
      throw new Error('Erro ao obter packetLoss: ' + error.message);
    }
};