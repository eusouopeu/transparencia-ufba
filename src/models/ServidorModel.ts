/* eslint-disable @typescript-eslint/no-explicit-any */
// Interface para Pessoa
export interface Pessoa {
  id: number;
  cpfFormatado: string;
  cnpjFormatado: string;
  numeroInscricaoSocial: string;
  nome: string;
  razaoSocialReceita: string;
  nomeFantasiaReceita: string;
  tipo: string;
}

// Interface para OrgaoServidor
export interface OrgaoServidor {
  codigo: string;
  nome: string;
  sigla: string;
  codigoOrgaoVinculado: string;
  nomeOrgaoVinculado: string;
}

// Interface para EstadoExercicio
export interface EstadoExercicio {
  sigla: string;
  nome: string;
}

// Interface para Funcao
export interface Funcao {
  codigoFuncaoCargo: string;
  descricaoFuncaoCargo: string;
}

// Interface para ServidorInativoInstuidorPensao e PensionistaRepresentante
export interface PessoaGenerica {
  id: number;
  cpfFormatado: string;
  nome: string;
}

// Interface para FichaCargoEfetivo
export interface FichasCargoEfetivo {
  nome: string;
  cpfDescaracterizado: string;
  matriculaDescaracterizada: string;
  dataPublicacaoDocumentoIngressoServicoPublico: string;
  diplomaLegal: string;
  jornadaTrabalho: string;
  regimeJuridico: string;
  situacaoServidor: string;
  afastamentos: any[]; // Defina o tipo apropriado se você tiver informações sobre os afastamentos
  orgaoSuperiorLotacao: string;
  orgaoLotacao: string;
  uorgLotacao: string;
  orgaoServidorLotacao: string;
  dataIngressoOrgao: string;
  dataIngressoServicoPublico: string;
  orgaoSuperiorExercicio: string;
  orgaoExercicio: string;
  orgaoServidorExercicio: string;
  uorgExercicio: string;
  cargo: string;
  classeCargo: string;
  padraoCargo: string;
  nivelCargo: string;
  dataIngressoCargo: string;
  formaIngresso: string;
  ufExercicio: string;
}

// Interface para Servidor
export interface Servidor {
  id: number;
  idServidorAposentadoPensionista: number;
  pessoa: Pessoa;
  situacao: string; 
  orgaoServidorLotacao: OrgaoServidor;
  orgaoServidorExercicio: OrgaoServidor;
  estadoExercicio: EstadoExercicio;
  tipoServidor: string;
  funcao: Funcao;
  servidorInativoInstuidorPensao: PessoaGenerica;
  pensionistaRepresentante: PessoaGenerica;
  codigoMatriculaFormatado: string;
  flagAfastado: number;
}

// Interface para a resposta da API
export interface ServidoresResponse {
  servidor: Servidor;
  fichasCargoEfetivo: FichasCargoEfetivo;
  fichasFuncao: any; 
  fichasMilitar: any; 
  fichasDemaisSituacoes: any;
  fichasAposentadoria: any; 
  fichasReformado: any; 
  fichasPensaoCivil: any; 
  fichasPensaoMilitar: any[]; 
}

export interface RemuneracoesResponse {
  servidor: Servidor;
  remuneracoesDTO: RemuneracaoDTO[];
}

export interface RemuneracaoDTO {
  skMesReferencia: string;
  mesAno: string;
  valorTotalRemuneracaoAposDeducoes: string;
  valorTotalRemuneracaoDolarAposDeducoes: string;
  valorTotalJetons: string;
  valorTotalHonorariosAdvocaticios: string;
  rubricas: Rubrica[];
  jetons: any[];
  honorariosAdvocaticios: any[];
  observacoes: any[];
  remuneracaoBasicaBruta: string;
  remuneracaoBasicaBrutaDolar: string;
  abateRemuneracaoBasicaBruta: string;
  abateRemuneracaoBasicaBrutaDolar: string;
  gratificacaoNatalina: string;
  gratificacaoNatalinaDolar: string;
  abateGratificacaoNatalina: string;
  abateGratificacaoNatalinaDolar: string;
  ferias: string;
  feriasDolar: string;
  outrasRemuneracoesEventuais: string;
  outrasRemuneracoesEventuaisDolar: string;
  impostoRetidoNaFonte: string;
  impostoRetidoNaFonteDolar: string;
  previdenciaOficial: string;
  previdenciaOficialDolar: string;
  outrasDeducoesObrigatorias: string;
  outrasDeducoesObrigatoriasDolar: string;
  pensaoMilitar: string;
  pensaoMilitarDolar: string;
  fundoSaude: string;
  fundoSaudeDolar: string;
  taxaOcupacaoImovelFuncional: string;
  taxaOcupacaoImovelFuncionalDolar: string;
  verbasIndenizatoriasCivil: string;
  verbasIndenizatoriasCivilDolar: string;
  verbasIndenizatoriasMilitar: string;
  verbasIndenizatoriasMilitarDolar: string;
  verbasIndenizatoriasReferentesPDV: string;
  verbasIndenizatoriasReferentesPDVDolar: string;
  remuneracaoEmpresaPublica: boolean;
  existeValorMes: boolean;
  verbasIndenizatorias: string;
  verbasIndenizatoriasDolar: string;
  mesAnoPorExtenso: string;
}

export interface Rubrica {
  codigo: string;
  descricao: string;
  valor: number;
  skMesReferencia: string;
  valorDolar: number;
}