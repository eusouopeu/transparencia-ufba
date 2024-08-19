
import TripsSummary from '../containers/summaries/TripsSummary'
import TripsTable from '../components/tables/TripsTable'

export default function TripsView() {
  return (
    <section className='views'>

      
      <TripsTable />

      <TripsSummary />
  
    </section>
  )
}
