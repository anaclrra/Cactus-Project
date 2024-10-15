import axios from "axios";

export const LatencyService = async () => {
    const apiUrl = process.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/customers/latency`);

      if (response.status !== 200) { 
        throw new Error('Erro ao obter user than latency > 50');
      } 
     
      return response.data;
    } catch (error) {
      throw new Error('Erro ao obter user than latency > 50: ' + error.message);
    }
};