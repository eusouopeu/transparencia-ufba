
import GradPieChart from '../components/charts/pie/GradPieChart'
// import DebtsLineChart from '../components/charts/line/DebtsLineChart'
import TurnoAlunosPieChart from '../components/charts/pie/TurnoAlunosPieChart'

export default function DashChartsContainer() {
  return (
    <section className='charts-container'>
        
        <div className='flex gap-4'>
          <GradPieChart/>
          <div className='flex flex-col gap-4'>
            <TurnoAlunosPieChart/>
            {/* <DebtsLineChart/> */}
          </div>
        </div>
        

      </section>
  )
}
