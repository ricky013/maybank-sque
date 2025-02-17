import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'

interface CalendarRangeSingleProps {
  dateRange: DateRange | undefined
  onDateChange: (range: DateRange | undefined) => void
}

const CalendarRangeSingle = ({ dateRange, onDateChange }: CalendarRangeSingleProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] flex justify-between text-left font-normal bg-white',
            !dateRange?.from && 'text-muted-foreground'
          )}
        >
          {dateRange?.from ? (
            dateRange.to ? (
              `${format(dateRange.from, 'yyyy-MM-dd')} - ${format(dateRange.to, 'yyyy-MM-dd')}`
            ) : (
              format(dateRange.from, 'yyyy-MM-dd')
            )
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="range" selected={dateRange} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export default CalendarRangeSingle
