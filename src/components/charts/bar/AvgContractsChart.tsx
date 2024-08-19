/** @format */

import { useEffect, useState } from "react";
import { ContractModel } from "../../../models/ContractsModel";
import { fetchContracts } from "../../../api/FetchContracts";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "antd";

const AvgContractsChart: React.FC = () => {
	const [contracts, setContracts] = useState<ContractModel[]>([])
	const [data, setData] = useState<{ modalidade: string; count: number }[]>(
		[],
	)

	useEffect(() => {
		fetchContracts()
			.then((contractsData) => {
				setContracts(contractsData)

				// Agrupa os contratos por modalidade
				const modalidadeCount = contractsData.reduce(
					(acc: { [key: string]: number }, contract) => {
						acc[contract.modalidade] =
							(acc[contract.modalidade] || 0) + 1
						return acc
					},
					{},
				)

				// Prepara os dados para o gráfico
				const chartData = Object.keys(modalidadeCount).map((key) => ({
					modalidade: key,
					count: modalidadeCount[key],
				}))

				setData(chartData)
			})
			.catch((error) =>
				console.error('Erro ao carregar contratos:', error),
			)
	}, [])

	return (
		<ResponsiveContainer
			width='100%'
			height={400}
		>
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<XAxis dataKey='modalidade' />
				<YAxis />
				<Tooltip />
				<Bar
					dataKey='count'
					fill='#8884d8'
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default AvgContractsChart
