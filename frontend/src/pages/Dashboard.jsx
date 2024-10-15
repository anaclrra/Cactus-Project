import React from "react";
import Grid from '@mui/material/Grid2';

import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Pie from "../components/PieChart";
import CardData from "../components/Card";
import TableData from "../components/TableData";
import ListData from "../components/ListData";
import BarData from "../components/BarData";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
          <SideBar/>
          <div className="flex flex-1 flex-col overflow-y-auto bg-[#ececec]">
              <Header/>
        
                <Grid className='p-4' container spacing={{ xs: 2, md: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 1.5 }}>
                <Grid size={{ xs: 12, md:8, sm: 12 }}  >
                    <TableData/> 
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                     <ListData/> 
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <CardData />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                     <Pie/> 
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                     <BarData/> 
                  </Grid>
                  
                </Grid>
          
          </div>
        </div>
    );
};

export default Dashboard;
