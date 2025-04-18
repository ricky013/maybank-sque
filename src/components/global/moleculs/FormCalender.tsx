import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '../atoms/ErrorInputForm'
import { format } from 'date-fns'

interface ICalender {
  name: string
  label: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  control: any
  className?: string
  placeholder?: string
  excludeDate: any
}

const FormCalender: React.FC<ICalender> = ({
  name,
  label,
  errors,
  control,
  customError,
  className,
  placeholder,
  excludeDate
}) => {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  function isWeekend(day: any) {
    const dayOfWeek = day.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // 0 = Minggu, 6 = Sabtu
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <Label htmlFor={name} className="text-black">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="grid w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full flex justify-between text-left font-normal bg-white',
                    !selectedDate && 'text-muted-foreground'
                  )}
                  onClick={() => setOpen(true)}
                >
                  {selectedDate ? (
                    format(selectedDate, 'yyyy-MM-dd')
                  ) : (
                    <span> {placeholder ? placeholder : 'Pick a date'} </span>
                  )}
                  <CalendarIcon className="w-4 h-4 mr-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date)
                    field.onChange(date)
                    setOpen(false)
                  }}
                  initialFocus
                  disabled={
                    excludeDate
                      ? [{ before: new Date() }, isWeekend, ...excludeDate]
                      : [{ before: new Date() }, isWeekend]
                  }
                />
              </PopoverContent>
            </Popover>
            {errors[name] && <ErrorInputForm statusError={errors[name]} />}
            {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
          </div>
        )}
      />
    </div>
  )
}

export default FormCalender
