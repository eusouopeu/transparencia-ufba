
import CreditExtractTable from '../components/tables/CreditExtractTable'
import CreditSummary from '../containers/summaries/CreditSummary'

export default function CreditExtractView() {
  return (
    <section className='views'>

      <CreditExtractTable/>

      <CreditSummary/>
      
    </section>
  )
}
