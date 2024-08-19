export interface StaffModelHeader {
  id: keyof StaffModel
  numeric: boolean
  disablePadding: boolean
  label: string
}

export interface StaffModel {
  id: number;
  nome: string;
  unidade: string;
  cargo: string;
  admissao: string | number;
  salario: string;
}

export interface RawStaffModel {
  id: number;
  nome: string;
  cpfDescaracterizado: string;
  matriculaDescaracterizada?: string;
  jornadaTrabalho: string;
  uorgLotacao: string;
  dataIngressoCargo: string | undefined;
  uorgExercicio: string;
  cargo: string;
  regimeJuridico?: string | undefined;
  cargo2?: string | undefined;
  jornadaTrabalho2?: string | undefined;
  dataIngressoCargo2?: string | undefined;
  classeCargo: string;
  padraoCargo: string;
  nivelCargo: string;
  remuneracaoBasicaBruta: string;
}