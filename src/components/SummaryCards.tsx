import clsx from "clsx"

interface SummaryCardsProps {
  title: string
  value: string
  extra?: string
  className?: string
}
export default function SummaryCards({ title, value, extra, className }: SummaryCardsProps) {
  return (
    <div className={clsx('summary-card', className)}>
      <h5 className='text-[18px] italic font-semibold text-black'>{title}</h5>
      <h3 className='text-[34px] font-extrabold text-blue-800'>{value}</h3>
      <div className='flex flex-row gap-[16px]'>
        {extra}
      </div>
    </div>
  )
}
