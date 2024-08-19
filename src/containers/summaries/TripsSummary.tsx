

import SummaryCards from '../../components/SummaryCards'
export default function TripsSummary() {
  return (
    <section className='summary-container'>
        <SummaryCards title='Média (passagens)' value={`R$ - - -`} />
        <SummaryCards title='Média (diárias)' value={`R$ - - -`} />
    </section>
  )
}
