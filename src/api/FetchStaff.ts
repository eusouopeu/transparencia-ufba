/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

export interface Servidor {
  id: number
  lotacao: string
  exercicio: string
  cargo: string
  admissao: string
  nome: string
}

export interface ServidoresResponse {
  servidor: Servidor
  // Adicione outros campos se necessário
}

export interface RemuneracaoResponse {
  id: number
  nome: string
  salarioBruto: number
  auxilios: number
  outrasRemuneracoes: number
  previdenciaOficial: number
  IRRF: number
  // Adicione outros campos se necessário
}

export const fetchServidoresComRemuneracao = (): Promise<any[]> => {
  const urlServidores = 'https://api.portaldatransparencia.gov.br/api-de-dados/servidores'
  const urlRemuneracao = 'https://api.portaldatransparencia.gov.br/api-de-dados/servidores/remuneracao'
  const headers = {
    'Accept': '*/*',
    'chave-api-dados': '707532d2cd4eef27fdd5160dcef56995',
  }

  const allServidores: ServidoresResponse[] = []
  const promises: Promise<void>[] = []
  let allStaff: any[] = []
  let allStaffIncome: any[] = []

  for (let pagina = 1; pagina <= 5; pagina++) {
    const paramsServidores = {
      orgaoServidorExercicio: '26232',
      pagina: String(pagina),
    }

    const promise = axios.get<ServidoresResponse[]>(urlServidores, {
      params: paramsServidores,
      headers: headers,
    })
    .then((response: AxiosResponse<any[]>) => {
      const staff = response.data.map((servidor: any) => ({
        id: servidor.id,
        nome: servidor.fichasCargoEfetivo[0].nome,
        lotacao: servidor.fichasCargoEfetivo[0].uorgLotacao,
        exercicio: servidor.fichasCargoEfetivo[0].uorgExercicio,
        cargo: servidor.fichasCargoEfetivo[0].cargo,
        admissao: servidor.fichasCargoEfetivo[0].dataIngressoCargo,
      }))
      
      allStaff = [...allStaff, ...staff]
    })
    .catch((error) => {
      console.error(`Error fetching servidores on page ${pagina}:`, error)
      throw error
    })
    
    promises.push(promise)
  }
  
  return Promise.all(promises)
  .then(() => {
    // Depois de obter todos os servidores, faz a segunda requisição para obter as remunerações
    const remuneracaoPromises = allServidores.map((servidorResponse) => {
      const idServidorPensionista = servidorResponse.servidor.id
      
      const paramsRemuneracao = {
        idServidorPensionista: idServidorPensionista,
        mesAno: '202405',
        pagina: 1,
      }
      
      return axios.get<any[]>(urlRemuneracao, {
        params: paramsRemuneracao,
        headers: headers,
      })
      .then((remuneracaoResponse: AxiosResponse<any[]>) => {
        const staffIncome = remuneracaoResponse.data.map((servidor: any) => ({
          id: servidor.idServidorPensionista,
          nome: servidor.pessoa.nome,
          salarioBruto: servidor.remuneracoesDTO[0].rubricas[0].valor,
          auxilios: servidor.remuneracoesDTO[0].rubricas[1].valor,
          outrasRemuneracoes: servidor.remuneracoesDTO[0].rubricas[2].valor,
          previdenciaOficial: servidor.remuneracoesDTO[0].rubricas[3].valor,
          IRRF: servidor.remuneracoesDTO[0].rubricas[4].valor,
        }))
        
        allStaffIncome = [...allStaffIncome, ...staffIncome]

        return allStaffIncome
      })
    })

      return Promise.all(remuneracaoPromises)
    })
    .catch((error) => {
      console.error('Error fetching servidores com remuneração:', error)
      throw error
    })
}
