import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Box, CircularProgress } from '@mui/material';
import { AvailabilityService } from "../services/AvailabilityService";


const TableData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AvailabilityService();
        console.log('Dados retornados da API:', result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; 

  if (!data) {
    return(
      <Box className='flex flex-1 justify-center items-center mt-20'>
        <CircularProgress />
      </Box>
    )
    
  }
  return (
    <Card className='min-w-6 h-80'>
      <CardContent>
      <TableContainer >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Perfil</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Disponibilidade </TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((item) => (
                        <TableRow key={item.customerId}>
                          <TableCell>{item.customer.perfil}</TableCell>
                          <TableCell>{item.customer.name}</TableCell>
                          <TableCell>{item.availability}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[4, 8, 16, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          slotProps={{
                            select: {
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            },
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableRow>
                    </TableFooter>
                    
        </Table>
        </TableContainer>
         {/* <LineChart
          dataset={chartData}
          series={[{ 
            label: 'Disponibilidade (%)', 
            dataKey: 'availability',  
            stroke: '#1F3BB3',
            stack: 'total',
            showMark: true,
          }]}
          xAxis={[{ 
            scaleType: 'band', 
            dataKey: 'name', 
          }]}
          yAxis={[{ 
            min: 96, 
            max: 100 ,  
            
          }]}
          title="Disponibilidade dos Clientes"
          
          width={600}
          height={260}
        />  */}
      </CardContent>
    </Card> 
  );
}

export default TableData;
