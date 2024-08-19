import DREAccordion from '../components/DREAccordion'
import ContractsTable from '../components/tables/ContractsTable'


export default function ContractsView() {
  return (
    <section className='views'>

      <div className='absolute md:w-[51%]'>
        <ContractsTable />
      </div>
      
      <div className='md:ml-[68%] w-fit'>
        <DREAccordion />
      </div>

      {/* <CustomAccordion/> */}
      
    </section>
  )
}
