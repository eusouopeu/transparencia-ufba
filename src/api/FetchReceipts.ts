/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import axios, { AxiosResponse } from 'axios'
import { ReceiptModel } from '../models/ReceiptsModel'

export const fetchReceipts = (): Promise<ReceiptModel[]> => {
	const url =
		'https://api.portaldatransparencia.gov.br/api-de-dados/notas-fiscais'
	const headers = {
		Accept: '*/*',
		'chave-api-dados': '707532d2cd4eef27fdd5160dcef56995',
	}

	let allReceipts: ReceiptModel[] = []
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
				const receipt = response.data.map((nota: any) => ({
					id: nota.id,
					fornecedor: nota.nomeFornecedor.toLowerCase(),
					cnpj: nota.cnpjFornecedor,
					municipio: nota.municipioFornecedor.toLowerCase(),
					data: nota.dataEmissao,
					valor: `R$ ${nota.valorNotaFiscal}`,
				}))

				allReceipts = [...allReceipts, ...receipt]
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
		.then(() => allReceipts)
		.catch((error) => {
			console.error('Erro ao processar todas as requisições:', error)
			throw error
		})
}
