/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import axios, { AxiosResponse } from 'axios'
import { TripModel } from '../models/TripsModel'

export const fetchTrips = (): Promise<TripModel[]> => {
	const url = 'https://api.portaldatransparencia.gov.br/api-de-dados/viagens'
	const headers = {
		Accept: '*/*',
		'chave-api-dados': '707532d2cd4eef27fdd5160dcef56995',
	}

	let allTrips: TripModel[] = []
	const promises: Promise<void>[] = []

	const dateRanges = [
		{
			dataIdaDe: '01/03/2024',
			dataIdaAte: '01/04/2024',
			dataRetornoDe: '01/04/2024',
			dataRetornoAte: '01/05/2024',
		},
		{
			dataIdaDe: '01/04/2024',
			dataIdaAte: '01/05/2024',
			dataRetornoDe: '01/05/2024',
			dataRetornoAte: '01/06/2024',
		},
		{
			dataIdaDe: '01/05/2024',
			dataIdaAte: '01/06/2024',
			dataRetornoDe: '01/06/2024',
			dataRetornoAte: '01/07/2024',
		},
	]

	dateRanges.forEach((range) => {
		const params = {
			...range,
			codigoOrgao: '26232',
			pagina: '1',
		}

		const promise = axios
			.get(url, { params, headers })
			.then((response: AxiosResponse<any[]>) => {
				// Filtra os dados para retornar apenas os campos desejados
				const trips = response.data.map((trip: any) => ({
					id: trip.id,
					motivo: trip.viagem.motivo.toLowerCase(),
					beneficiario: trip.beneficiario.nome.toLowerCase(),
					cargo: trip.cargo.descricao
						.toUpperCase()
						.includes('PROFESSOR')
						? 'Professor'
						: trip.cargo.descricao
								.toUpperCase()
								.includes('ASSISTENTE')
						? 'Tec. Admin.'
						: trip.cargo.descricao.toLowerCase(),
					unidade: trip.unidadeGestoraResponsavel.nome,
					dataInicio: Intl.DateTimeFormat('pt-BR').format(
						new Date(trip.dataInicioAfastamento),
					),
					dataFim: Intl.DateTimeFormat('pt-BR').format(
						new Date(trip.dataFimAfastamento),
					),
					valorDiarias: `R$ ${trip.valorTotalDiarias}`,
					valorPassagens: `R$ ${trip.valorTotalPassagens}`,
					valorTotal: `R$ ${Intl.NumberFormat('pt-BR').format(
						trip.valorTotalViagem,
					)}`,
				}))

				allTrips = [...allTrips, ...trips]
			})
			.catch((error) => {
				console.error(
					`Erro ao buscar dados de viagens para o intervalo ${range.dataIdaDe} - ${range.dataRetornoAte}:`,
					error,
				)
				throw error
			})

		promises.push(promise)
	})

	return Promise.all(promises)
		.then(() => allTrips)
		.catch((error) => {
			console.error('Erro ao processar todas as requisições:', error)
			throw error
		})
}
