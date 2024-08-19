import clsx from "clsx"

interface LineChartProps {
  title: string
  className?: string
  children: React.ReactNode
}
export default function ChartCard({ title, className, children }: LineChartProps) {
  
  return (
    <div className={clsx('chart-card', className)}>
      <div className='flex flex-col items-start gap-[8px] pl-[12px]'>
        <h3 className="text-[24px] text-slate-600 font-bold italic">{title}</h3>
      </div>
      {children}
    </div>
  )
}
