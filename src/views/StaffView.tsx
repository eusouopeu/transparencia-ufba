import StaffTable from '../components/tables/StaffTable'
import StaffSummary from '../containers/summaries/StaffSummary'

export default function StaffView() {
  return (
    <section className='views'>

      <div className='flex flex-col w-[100%] md:h-[75%]'>
        <StaffTable/>
      </div>

      <StaffSummary/>
      
    </section>
  )
}
