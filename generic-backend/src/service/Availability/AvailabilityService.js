const Prisma  = require('../../client');
const { calculateAvailability } = require("../../helpers/AvailabilityCalculation");

// Obtem a disponibilildade dos clientes
const AvailabilityService = async () => {
    try {
      const customers = await Prisma.customers.findMany();
 
        const customersAvailabilityPromises = customers.map(async (customer) =>{
            const metrics = await Prisma.metrics.findMany({
                where:{customerId: customer.id},
                orderBy: {date: 'asc'}
              })
              if(metrics.length > 0) {
                const availability = calculateAvailability(metrics, customer.perfil);
                return availability > 97 ? {customer, availability} : null;
                }
                return null;
            })
        const customersAvailability = await Promise.all(customersAvailabilityPromises);
        return customersAvailability.filter(Boolean);     
    } catch (error) {
      error.path = "src/service/AvailabilityService.js"
      throw error;
  
    }
}

module.exports = {AvailabilityService}