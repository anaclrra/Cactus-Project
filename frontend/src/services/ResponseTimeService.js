import axios from "axios";

export const ResponseTimeService = async () => {
    const apiUrl = process.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/customers/responseTime`);

      if (response.status !== 200) { 
        throw new Error('error fetching client improvement data');
      } 
     
      return response.data;
    } catch (error) {
      throw new Error('Error fetching client improvement data: ' + error.message);
    }
};