/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import axios, { AxiosResponse } from 'axios'
import { CreditExtractModel } from '../models/CreditExtractModel'

export const fetchCreditExtract = (): Promise<CreditExtractModel[]> => {
	const url = 'https://api.portaldatransparencia.gov.br/api-de-dados/cartoes'
	const headers = {
		Accept: '*/*',
		'chave-api-dados': '707532d2cd4eef27fdd5160dcef56995',
	}

	let allCreditExtracts: CreditExtractModel[] = []
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
				const creditExtract: CreditExtractModel[] = response.data.map(
					(transacao: any) => ({
						id: transacao.id,
						estabelecimento:
							transacao.estabelecimento.nome.toLowerCase(),
						cnpj: transacao.estabelecimento.cnpjFormatado,
						data: transacao.dataTransacao,
						valor: `R$ ${transacao.valorTransacao}`,
					}),
				)

				allCreditExtracts = [...allCreditExtracts, ...creditExtract]
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
		.then(() => allCreditExtracts)
		.catch((error) => {
			console.error('Erro ao processar todas as requisições:', error)
			throw error
		})
}
