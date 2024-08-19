/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import axios, { AxiosResponse } from 'axios'
import { ContractModel } from '../models/ContractsModel'

export const fetchContracts = (): Promise<ContractModel[]> => {
	const url =
		'https://api.portaldatransparencia.gov.br/api-de-dados/contratos'
	const headers = {
		Accept: '*/*',
		'chave-api-dados': '707532d2cd4eef27fdd5160dcef56995',
	}

	let allContracts: ContractModel[] = []
	const promises: Promise<void>[] = []

	for (let pagina = 1; pagina <= 3; pagina++) {
		const params = {
			codigoOrgao: '26232',
			pagina: Number(pagina),
		}

		const promise = axios
			.get(url, { params, headers })
			.then((response: AxiosResponse<any[]>) => {
				// Filtra os dados para retornar apenas os campos desejados
				const contract = response.data.map((contract: any) => ({
					id: contract.id,
					modalidade: contract.modalidadeCompra,
					descricao: contract.objeto,
					fornecedor: contract.fornecedor.nome.toLowerCase(),
					unidade: contract.unidadeGestora.nome,
					publicacao: contract.dataPublicacaoDOU,
					valorInicial: contract.valorInicialCompra,
					valorFinal: `R$ ${Intl.NumberFormat('pt-BR').format(
						contract.valorFinalCompra,
					)}`,
				}))

				allContracts = [...allContracts, ...contract]
			})
			.catch((error) => {
				console.error(
					`Erro ao buscar notas fiscais na página ${pagina}:`,
					error,
				)
				throw error
			})

		promises.push(promise)
	}

	return Promise.all(promises)
		.then(() => allContracts)
		.catch((error) => {
			console.error('Erro ao processar todas as requisições:', error)
			throw error
		})
}
