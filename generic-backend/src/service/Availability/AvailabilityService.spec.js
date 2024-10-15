const { AvailabilityService } = require('./AvailabilityService');
const { Prisma, customers } = require('../../client');

jest.mock('../../client', () => ({
    Prisma: {
        customers: {
            findMany: jest.fn(() => { })
        },
        metrics: {
            findMany: jest.fn(() => { })
        },
        $disconnect: jest.fn(),
    },

}));

describe('Availability Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    })
    it('deve retornar vazio []', async () => {
        
        Prisma.customers.findMany.mockResolvedValue([
            {id: 1, name: 'Cliente A', perfil: 1},
            {id: 2, name: 'Cliente B', perfil: 2},
            {id: 3, name: 'Cliente C', perfil: 3},
            
        ])

            Prisma.metrics.findMany.mockResolvedValueOnce([
            { date: '2023-10-15T03:20:00.000Z', ping: true },
            { date: '2023-10-15T03:20:00.000Z', ping: false },
            { date: '2023-10-15T03:21:00.000Z', ping: true },
            { date: '2023-10-15T03:21:00.000Z', ping: false }
          ]);

          Prisma.metrics.findMany.mockResolvedValueOnce([
            { date: '2023-10-15T03:20:00.000Z', ping: false, packetLoss: null },
            { date: '2023-10-15T03:20:00.000Z', ping: false, packetLoss: null}, 
            { date: '2023-10-15T03:21:00.000Z', ping: true, packetLoss: 0 },
            { date: '2023-10-15T03:21:00.000Z', ping: true, packetLoss: 10 },
        ]);

        Prisma.metrics.findMany.mockResolvedValueOnce([
            { date: '2023-10-15T03:20:00.000Z', ping: true, latency: 20 },
            { date: '2023-10-15T03:20:00.000Z', ping: true, latency: 80 },
            { date: '2023-10-15T03:21:00.000Z', ping: true, latency: 45 },
            { date: '2023-10-15T03:21:00.000Z', ping: true, latency: 70 },
        ]);


        const result = await AvailabilityService();

        expect(result).toEqual([])
        expect(Prisma.customers.findMany).toHaveBeenCalled();
        expect(Prisma.metrics.findMany).toHaveBeenCalled();
    })
    it('deve retornar clientes com disponibilidade maior que 97', async () => {
        
        Prisma.customers.findMany.mockResolvedValue([
            {id: 1, name: 'Cliente A', perfil: 1},
            {id: 2, name: 'Cliente B', perfil: 2},
            {id: 3, name: 'Cliente C', perfil: 3},
            
        ])

        Prisma.metrics.findMany.mockResolvedValueOnce([
            { date: '2023-10-15T03:20:00.000Z', ping: true },
            { date: '2023-10-15T03:20:00.000Z', ping: true },
            { date: '2023-10-15T03:21:00.000Z', ping: true },
            { date: '2023-10-15T03:21:00.000Z', ping: true }, 
            { date: '2023-10-15T05:20:00.000Z', ping: false }, //0.5 donwTime 120 minutos
        ]);

        Prisma.metrics.findMany.mockResolvedValueOnce([
            { date: '2023-10-15T03:20:00.000Z', ping: true, packetLoss: 0 },
            { date: '2023-10-15T03:20:00.000Z', ping: true, packetLoss: 10 }, //0.5 donwTime
            { date: '2023-10-15T03:21:00.000Z', ping: true, packetLoss: 0 }, //+0.5 donwTime
            { date: '2023-10-15T03:21:00.000Z', ping: true, packetLoss: 0 }, 
            { date: '2023-10-15T04:20:00.000Z', ping: true, packetLoss: 0 }, // 60 minutos
        ]);

        Prisma.metrics.findMany.mockResolvedValueOnce([
            { date: '2023-10-15T03:20:00.000Z', ping: true, latency: 20 },
            { date: '2023-10-15T03:20:00.000Z', ping: true, latency: 30 }, 
            { date: '2023-10-15T03:40:00.000Z', ping: true, latency: 25 }, 
            { date: '2023-10-15T03:40:00.000Z', ping: true, latency: 15 }, 
            { date: '2023-10-15T03:50:00.000Z', ping: true, latency: 90 }, //0.5 donwTime
            { date: '2023-10-15T04:00:00.000Z', ping: true, latency: 55 }, //+0.5 donwTime
        ]);


        const result = await AvailabilityService();

        expect(result).toEqual([
            {
                customer: { id: 1, name: 'Cliente A', perfil: 1 },
                availability: '99.58',
            },
            {
                customer: { id: 2, name: 'Cliente B', perfil: 2 },
                availability: '99.17',
            },
            {
                customer: { id: 3, name: 'Cliente C', perfil: 3 },
                availability: '97.50',
            }
        ])
        expect(Prisma.customers.findMany).toHaveBeenCalled();
        expect(Prisma.metrics.findMany).toHaveBeenCalled();
    })
})