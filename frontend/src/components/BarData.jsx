import React, { useEffect, useState } from 'react';
import {Box, Card, CardContent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { CustomersService } from '../services/CustomersService';
import CircularProgress from '@mui/material/CircularProgress';

const BarData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CustomersService();
        console.log('Dados retornados da API:', result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!data || !data.customers) {
    return(
      <Box className='flex flex-1 justify-center items-center mt-20'>
        <CircularProgress />
      </Box>
    )
    
  }
  
  const chartData =  data.customers.map(item => ({
    perfil: `Perfil ${item.perfil}`,
    count: item._count.id 
  }));

  console.log('Dados para o gráfico:', chartData);
  return (
    <Card className="m-auto w- h-52  text-white rounded-lg shadow-lg">
      <CardContent className='flex flex-1 min-w-6'>
        <BarChart
        dataset={chartData}
            yAxis={[
              {max: data.totalCustomers}
            ]} 
            xAxis={[{ 
              scaleType: 'band', 
              data: chartData.map((item) => item.perfil),
            }]}
            series={[
              {
                dataKey: 'count', 
                label: 'Clientes',
              }
            ]}
            width={300}
            height={200}
            
          /> 
      
      </CardContent>
    </Card>

    
  );
}

export default BarData;
