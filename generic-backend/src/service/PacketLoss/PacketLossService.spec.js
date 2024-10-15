const { Prisma } = require('../../client');
const { PacketLossService } = require('./PacketLossService');


jest.mock('../../client', () => ({
    Prisma: {
        metrics: {
            findMany: jest.fn(() => { }),
            aggregate: jest.fn()
        },
        $disconnect: jest.fn(),
    },

}));

describe('Packet Loss Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve buscar os clientes com perda de pacotes máxima', async () => {
        Prisma.metrics.aggregate.mockResolvedValueOnce({
            _max:{
                packetLoss: 5,
            }
        });

        Prisma.metrics.findMany.mockResolvedValueOnce([
            {
                id: '1',
                date: '2024-10-09T03:25:00.000Z',
                latency: 97,
                packetLoss: 5,
                ping: false,
                traffic: 5.67,
                customerId: '2',
                customer: {
                    id: '2',
                    name: 'Cliente B',
                    perfil: 3,
                },
            },
            {
                id: '2',
                date: '2024-10-09T04:10:00.000Z',
                latency: 80,
                packetLoss: 5,
                ping: true,
                traffic: 9.73,
                customerId: '3',
                customer: {
                    id: '3',
                    name: 'Cliente C',
                    perfil: 2,
                },
            },
        ])

        const result = await PacketLossService();

        expect(result).toEqual([
            {
                id: '1',
                date: '2024-10-09T03:25:00.000Z',
                latency: 97,
                packetLoss: 5,
                ping: false,
                traffic: 5.67,
                customerId: '2',
                customer: {
                    id: '2',
                    name: 'Cliente B',
                    perfil: 3,
                },
            },
            {
                id: '2',
                date: '2024-10-09T04:10:00.000Z',
                latency: 80,
                packetLoss: 5,
                ping: true,
                traffic: 9.73,
                customerId: '3',
                customer: {
                    id: '3',
                    name: 'Cliente C',
                    perfil: 2,
                },
            },
        ]);
        expect(Prisma.metrics.aggregate).toHaveBeenCalled();
        expect(Prisma.metrics.findMany).toHaveBeenCalled()
    });
});

