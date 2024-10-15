const { Prisma } = require('../../client');
const { LatencyService } = require('./LatencyService');

jest.mock('../../client', () => ({
    Prisma: {
        metrics: {
            findMany: jest.fn(() => { })
        },
        $disconnect: jest.fn(),
    },

}));

describe('Latency Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve buscar os clientes com latência maior que 50', async () => {
        Prisma.metrics.findMany.mockResolvedValue([
            {
                id: '1',
                date: '2024-10-09T03:25:00.000Z',
                latency: 97,
                packetLoss: 0,
                ping: true,
                traffic: 9.73,
                customerId: '1',
                customer: {
                    id: '1',
                    name: 'Cliente A',
                    perfil: 3,
                },
            },
            {
                id: '2',
                date: '2024-10-09T04:10:00.000Z',
                latency: 56,
                packetLoss: 1,
                ping: false,
                traffic: 5.67,
                customerId: '2',
                customer: {
                    id: '2',
                    name: 'Cliente B',
                    perfil: 3,
                },
            },
        ]);

        const result = await LatencyService();

        expect(result).toEqual([
            {
                id: '1',
                date: '2024-10-09T03:25:00.000Z',
                latency: 97,
                packetLoss: 0,
                ping: true,
                traffic: 9.73,
                customerId: '1',
                customer: {
                    id: '1',
                    name: 'Cliente A',
                    perfil: 3,
                },
            },
            {
                id: '2',
                date: '2024-10-09T04:10:00.000Z',
                latency: 56,
                packetLoss: 1,
                ping: false,
                traffic: 5.67,
                customerId: '2',
                customer: {
                    id: '2',
                    name: 'Cliente B',
                    perfil: 3,
                },
            },
        ]);
        expect(Prisma.metrics.findMany).toHaveBeenCalled()
    });
});

