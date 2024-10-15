const  Prisma  = require('../../client');

//Obtem o cliente com melhor tempo de resposta ao longo da semana
const responseTimeService = async ()=>{
  try{
  const customers = await Prisma.customers.findMany();

  const today = new Date();
  const lastWeek = new Date(today.setDate(today.getDate() - 7));

  const customersDataPromisse = customers.map(async (customer) =>{
    const metrics = await Prisma.metrics.aggregate({
        where:{
          customerId: customer.id,
          date: {
            gte: lastWeek
          },
          latency: {not: null}
        },
        _avg:{ latency: true},
        orderBy: {
          date: 'asc' 
        },
      });
    
      return { metrics, customer }
  })
    
  const customersData= await Promise.all(customersDataPromisse);

  //Ordena o array pela menor média de latencia
  const sortedData = customersData.sort((a, b) => {
    return a.metrics._avg.latency - b.metrics._avg.latency ;
  });

  return sortedData;

  } catch (error) {
    error.path = "src/service/ResponseTimeService.js"
    throw error;

  }
}

module.exports = {responseTimeService }