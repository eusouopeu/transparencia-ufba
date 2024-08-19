export interface TripModelHeader {
  id: keyof TripModel
  numeric: boolean
  disablePadding: boolean
  label: string
}

export interface TripModel {
  id: number;
  motivo: string;
  beneficiario: string;
  cargo: string;
  unidade: string;
  dataInicio: string;
  dataFim: string;
  valorDiarias: string;
  valorPassagens: string;
  valorTotal: string;
}