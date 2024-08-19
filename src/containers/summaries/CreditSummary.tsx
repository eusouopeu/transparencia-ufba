/** @format */
import SummaryCards from '../../components/SummaryCards'
export default function CreditSummary() {
	return (
		<section className='summary-container'>
			<SummaryCards
				title='Média por uso'
				value={`R$ - - -`}
			/>
			<SummaryCards
				title='Empresa mais popular '
				value={`- - -`}
			/>
		</section>
	)
}
