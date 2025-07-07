// interfaces/RegistroPonto.ts

export interface RegistroPonto {
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
  saldo?: string;
  observacoes?: string;
  status: 'Presente' | 'Ausente' | 'Justificado' | string;
  motivoReajuste?: string;
}
