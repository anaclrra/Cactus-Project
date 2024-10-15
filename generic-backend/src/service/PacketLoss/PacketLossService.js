const  Prisma  = require('../../client');

// Obtem os clientes com maior perda de pacotes
const PacketLossService = async ()=>{
  try{
  const aggregations = await Prisma.metrics.aggregate({
    _max: {
      packetLoss: true,
    },
  })

  const maxPacketLoss = aggregations._max.packetLoss;

  const result = await Prisma.metrics.findMany({
    distinct:['customerId'],
    where:{
      packetLoss:maxPacketLoss
    },
    include:{
      customer: true
    },
    
  })
  return result

  } catch (error) {
    error.path = "src/service/PacketLossService.js"
    throw error;

  }
}

module.exports = {PacketLossService }