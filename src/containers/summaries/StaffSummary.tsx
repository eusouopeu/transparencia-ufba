import SummaryCards from '../../components/SummaryCards'


export default function StaffSummary() {
  return (
    <section className='summary-container'>
        <SummaryCards title='Média profs.' value={`R$ 13.453,56`} />
        <SummaryCards title='Média TAs' value={`R$ 3.054,40`} />
      </section>
  )
}
