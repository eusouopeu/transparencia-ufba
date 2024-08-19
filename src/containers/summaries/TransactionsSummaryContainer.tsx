/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

// import CountyPieChart from '../../components/charts/pie/CountyPieChart'
import SummaryCards from '../../components/SummaryCards'
import { mediaGastos, maiorGasto } from '../../utils/TransactionsComparison'

export default function TransactionsSummaryContainer() {
	const maiorValor = maiorGasto?.valor != undefined ? maiorGasto.valor : 0

	return (
		<section className='summary-container'>
			<SummaryCards
				title='Maior gasto'
				value={`R$ ${Intl.NumberFormat('pt-BR').format(maiorValor)}`}
			/>
			<SummaryCards
				title='Valor médio (transação)'
				value={`R$ ${Intl.NumberFormat('pt-BR').format(mediaGastos)}`}
			/>
		</section>
	)
}
