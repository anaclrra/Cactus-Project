const Prisma  = require('../../client');

// Obtem os clientes com latência excedida (maior que 50)
const LatencyService = async () => {
    try {
      const costumers = await Prisma.metrics.findMany({
        distinct:['customerId'],  
        where: {
            AND:[
              {latency: {
                not: null,
              },
              },{
              latency: {
                gte: 50,
              },
            },
            ],
          },
          include:{
            customer: true
          },
          
      })
      return costumers;
    } catch (error) {
      error.path = "src/service/LatencyService.js"
      throw error;

    }
}

module.exports = {LatencyService}

