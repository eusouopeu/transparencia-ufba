/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import axios, { AxiosResponse } from 'axios'
import { DebtModel } from '../models/DebtsModel'

export const fetchDebts = (): Promise<DebtModel[]> => {
	const url =
		'https://api.portaldatransparencia.gov.br/api-de-dados/despesas/por-orgao'
	const headers = {
		Accept: '*/*',
		'chave-api-dados': '707532d2cd4eef27fdd5160dcef56995',
	}

	let allDebts: DebtModel[] = []
	const promises: Promise<void>[] = []

	for (let ano = 2014; ano <= 2024; ano++) {
		const params = {
			ano: Number(ano),
			orgao: '26232',
			pagina: '1',
		}

		const promise = axios
			.get(url, { params, headers })
			.then((response: AxiosResponse<any[]>) => {
				// Filtra os dados para retornar apenas os campos desejados
				const debt: DebtModel[] = response.data.map((item: any) => ({
					ano: item.ano,
					empenhado: parseFloat(
						item.empenhado.replaceAll('.', '').replace(',', '.'),
					),
					liquidado: parseFloat(
						item.liquidado.replaceAll('.', '').replace(',', '.'),
					),
					pago: parseFloat(
						item.pago.replaceAll('.', '').replace(',', '.'),
					),
				}))

				allDebts = [...allDebts, ...debt]
			})
			.catch((error) => {
				console.error(`Erro ao buscar notas fiscais no ${ano}:`, error)
				throw error
			})

		promises.push(promise)
	}

	return Promise.all(promises)
		.then(() => allDebts)
		.catch((error) => {
			console.error('Erro ao processar todas as requisições:', error)
			throw error
		})
}
