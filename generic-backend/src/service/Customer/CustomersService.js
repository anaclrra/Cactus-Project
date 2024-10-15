const Prisma  = require('../../client');

// Obtem os clientes (total e por perfil) 
const CustomersService = async () => {
    try {
      const totalCustomers = await Prisma.customers.count();
      const customers = await Prisma.customers.groupBy({
        by:['perfil'],
        _count: {id: true}
      })
      return {totalCustomers, customers};
    } catch (error) {
      error.path = "src/service/CustomersSeervice.js"
      throw error;

    }
}

module.exports = {CustomersService}