import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, CardContent, CardHeader, CircularProgress } from '@mui/material';
import { LatencyService } from '../services/LatencyService';


export default function Pie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await LatencyService();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const colors = [
    '#00E1D4',
    '#1F3BB3',
    '#0D00A4',
    '#5300A8',
    '#A900DB',
    '#D400FF',
  ];
  
  const pieChartData = data.map((item, index) => ({
    label: `${item.customer.name}`,
    value: parseFloat(item.latency),
    color: colors[index % colors.length]
  }));

  if (!data) {
    return(
      <Box className='flex flex-1 justify-center items-center mt-20'>
        <CircularProgress />
      </Box>
    )
    
  }

  return (
    <Card className='min-w-48 h-52 p-4 flex flex-1 justify-start items-start'>
      <CardHeader className='w-1 text-nowrap'
      subheader='Clientes com latência excedida'/>
      <CardContent className='flex flex-col justify-center items-center' >
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}`,
              data: pieChartData,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 40, additionalRadius: -30, color: 'gray' }, 
              innerRadius: 20,
              outerRadius: 80,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -65,
              endAngle: 240,
              cx:69,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: 'bold',
              fontSize:12,
              fill: 'black',
              
            },
          }}
          slotProps={{
            legend: {
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              markGap: 2,
              itemGap: 5,
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              padding: 0,
              labelStyle: {
                fontSize: 10,
                fill: 'black',
              },
            },
          }}
          width={250}
          height={230}
        />
      </CardContent>
    </Card>
  );
}
