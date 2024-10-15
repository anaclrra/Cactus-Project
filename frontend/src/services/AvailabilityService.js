import axios from "axios";

export const AvailabilityService = async () => {
    const apiUrl = process.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/customers/availability`);
      console.log('Response:', response);
      if (response.status !== 200) { 
        throw new Error('Erro ao obter customer metrics');
      } 
  
      return response.data;
    } catch (error) {
      throw new Error('Erro ao obter customer metrics: ' + error.message);
    }
};