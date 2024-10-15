// Calcula a disponibilidade dos clientes com base no perfil
const calculateAvailability = (metrics, perfil) => {

    const startTime = new Date(metrics[0].date);
    const endTime = new Date(metrics[metrics.length - 1].date);

    //Periodo de Medição em minutos
    const totalMeasurementTime = (endTime - startTime) / (1000 * 60);
    let totalDowntime = 0;

    metrics.forEach(metric => {
        switch (perfil) {
        case 1:
            if (!metric.ping) totalDowntime += 0.5; // Tempo de cada coleta (2 coletas por Minuto)
            break;                                  // 30 seg para cada coleta
        case 2:
            if (!metric.ping || metric.packetLoss > 0) totalDowntime += 0.5;
            break;
        case 3:
            if (metric.ping && metric.latency > 50) totalDowntime += 0.5;
            break;
        default:
            throw new Error('Profile not found');
        }
    });
    // Calculo de dsiponibilidade D = [(To − Ti)/To] * 100
    const availability = ((totalMeasurementTime - totalDowntime) / totalMeasurementTime) * 100;
    return availability.toFixed(2);
}

module.exports = {calculateAvailability}