import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import profile from '../assets/profile.png';
import { PacketLossService } from '../services/PacketLossService';
import { Box, CircularProgress } from '@mui/material';


export default function ListData() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await PacketLossService();
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
  return (
    <>
      {data && data.length > 0 ? (
      <Card sx={{height:320}}  className='flex flex-col gap-1'>
        <CardContent className='overflow-y-scroll'>
          <div className='flex flex-row justify-center items-center gap-3 p-3'>
            <h1 className='text-gray-400 text-lg'>Maior perda de pacotes</h1>
            <span className="text-3xl font-bold p-3 bg-[#0D00A4] rounded-full text-[#00E1D4]">{data[0].packetLoss}%</span>

          </div>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={profile}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.customer.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.primary', display: 'inline' }}
                        >
                          perfil {item.customer.perfil}
                        </Typography>
                    
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < data.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    ) : (
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Nenhum dado disponível.
      </Typography>
    )}
    </>
  );
}
