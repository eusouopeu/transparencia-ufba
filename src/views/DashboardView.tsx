
import DashSummaryContainer from '../containers/summaries/DashboardSummary'
import DashChartsContainer from '../containers/DashChartsContainer'
// import TripsList from '../components/tables/TripsList'

export default function DashboardView() {
  return (
    <section className='views'>

      <DashChartsContainer/>

      <DashSummaryContainer/>
      
    </section>
  )
}
