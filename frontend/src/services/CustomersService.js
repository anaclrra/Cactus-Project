import axios from "axios";

export const CustomersService = async () => {
    const apiUrl = process.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/customers/count`);
      console.log('Response ultimp:', response);
      if (response.status !== 200) { 
        throw new Error('Erro ao obter customer ');
      } 
  
      return response.data;
    } catch (error) {
      throw new Error('Erro ao obter customer : ' + error.message);
    }
};