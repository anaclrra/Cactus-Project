const { PrismaClient } = require('@prisma/client');

const Prisma = new PrismaClient();

module.exports = Prisma;

process.on('SIGINT', async () => {
  console.log('Encerrando a aplicação (SIGINT)...');
  await Prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Encerrando a aplicação (SIGTERM)...');
  await Prisma.$disconnect();
  process.exit(0);
});
