const { Prisma } = require('../../client');
const { CustomersService } = require('./CustomersService');


jest.mock('../../client', () => ({
    Prisma: {
        customers: {
            count: jest.fn(() => { }),
            groupBy: jest.fn()
        },
        $disconnect: jest.fn(),
    },

}));

describe('Customer Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve buscar quantidade de clientes por perfil', async () => {
        Prisma.customers.count.mockResolvedValue(5);

        Prisma.customers.groupBy.mockResolvedValueOnce([
            { perfil: 1, _count: { id: 5 } },
            { perfil: 2, _count: { id: 3 } },
            { perfil: 3, _count: { id: 2 } },
        ])

        const result = await CustomersService();

        expect(result).toEqual({
            totalCustomers: 5,
            customers: [
                { perfil: 1, _count: { id: 5 } },
                { perfil: 2, _count: { id: 3 } },
                { perfil: 3, _count: { id: 2 } },
            ],
        });
        expect(Prisma.customers.count).toHaveBeenCalled();
        expect(Prisma.customers.groupBy).toHaveBeenCalledWith({
            by: ['perfil'],
            _count: { id: true },
        });
      
    });
});

