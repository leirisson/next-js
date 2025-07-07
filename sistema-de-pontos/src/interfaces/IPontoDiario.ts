export type IPontoDiario = {
    diaDoMes: string;
    primeiraEntrada?: string;
    primeiraSaida?: string;
    segundaEntrada?: string;
    segundaSaida?: string;
    credito?: string;
    debito?: string;
    horasNormais?: string;
    horasExtras?: string;
    horasTrabalhadas?: string;
    saldo?: string; // Pode ser um número ou string, dependendo do formato da API
    observacoes?: string;
    status?: string;
    motivoReajuste?: string;
};