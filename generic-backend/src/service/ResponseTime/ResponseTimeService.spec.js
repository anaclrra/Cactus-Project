const { Prisma } = require('../../client');
const { responseTimeService } = require('./ResponseTimeService');

jest.mock('../../client', () => ({
    Prisma: {
        metrics: {
            aggregate: jest.fn(),
        },
        customers: {
            findMany: jest.fn(),
        },
        $disconnect: jest.fn(),
    },

}));

describe('Response Time Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve buscar cliente com melhor média de latencia na ultima semana', async () => {
        Prisma.customers.findMany.mockResolvedValueOnce([
            {id: 1, name: 'Cliente A', perfil: 1},
            {id: 2, name: 'Cliente B', perfil: 2},
            {id: 3, name: 'Cliente C', perfil: 3},
        ]);

       
            Prisma.metrics.aggregate
            .mockResolvedValueOnce({ _avg: { latency: 100 } })
            .mockResolvedValueOnce({ _avg: { latency: 60 } })  
            .mockResolvedValueOnce({ _avg: { latency: 40 } }) 

        

        const result = await responseTimeService();

        expect(result).toEqual([
            {
                metrics: { _avg: { latency: 40 } },
                customer: { id: 3, name: 'Cliente C', perfil: 3 },
            },
            {
                metrics: { _avg: { latency: 60 } },
                customer: { id: 2, name: 'Cliente B', perfil: 2 },
            },
            {
                metrics: { _avg: { latency: 100 } },
                customer: { id: 1, name: 'Cliente A', perfil: 1 },
            },
        ]);
        expect(Prisma.customers.findMany).toHaveBeenCalled()
        expect(Prisma.metrics.aggregate).toHaveBeenCalled();
    });
});

