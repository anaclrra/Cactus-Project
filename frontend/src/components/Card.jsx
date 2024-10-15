import React, { useEffect, useState } from 'react';
import {Box, Card, CardContent, CardHeader, CircularProgress } from '@mui/material';
import { ResponseTimeService } from '../services/ResponseTimeService';


const CardData = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ResponseTimeService();
        console.log('Dados retornados da API:', result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return(
      <Box className='flex flex-1 justify-center items-center mt-20'>
        <CircularProgress />
      </Box>
    )
    
  }
    const customerName = data[0].customer.name;
    const profile = data[0].customer.perfil;
    const latency = data ? data[0].metrics._avg.latency : '00.00'
    //const latency = data ? data[0].metrics._avg.latency.toFixed(2) : '00.00';
    

  return (
    <Card className="min-w-6 h-52 text-white rounded-lg shadow-lg">
      <CardHeader
            subheader='Cliente com melhor tempo de resposta'/>
      <CardContent className="flex flex-col items-center justify-center gap-3">

         <div className='flex justify-center items-center gap-3'>
            <div>
              <h1 className="text-2xl font-bold  origin-left">{customerName}</h1>
              <p className='text-lg font-medium text-gray-400'>Perfil {profile}</p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-[#D400FF] flex items-center justify-center">
              <span className="text-xl font-bold text-[#5300A8]">{latency}ms</span>
            </div>
          </div>
        
          
        
      </CardContent>
</Card>

    
  );
}

export default CardData;