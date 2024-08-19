import TransactionsSummaryContainer from '../containers/summaries/TransactionsSummaryContainer'
import ReceiptsTable from '../components/tables/ReceiptsTable'

export default function TransactionsView() {
  
  return (
    <section className='views'>

      <ReceiptsTable/>

      <TransactionsSummaryContainer/>
      
    </section>
  )
}
