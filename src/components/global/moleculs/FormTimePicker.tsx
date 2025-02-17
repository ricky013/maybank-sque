import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TimePicker } from '@/components/ui/timepicker'
import { ClockIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '../atoms/ErrorInputForm'

interface IFormTimePicker {
  name: string
  label: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  control: any
}

const FormTimePicker: React.FC<IFormTimePicker> = ({ name, label, errors, control, customError }) => {
  const [selectedTime, setSelectedTime] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
    period: 'AM'
  })

  // Fungsi untuk menangani perubahan waktu
  const handleTimeChange = (newTime: { hours: number; minutes: number; seconds?: number; period: 'AM' | 'PM' }) => {
    setSelectedTime(newTime)
  }

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="w-[280px] flex justify-between text-left font-normal bg-white"
                onClick={() => field.onChange(selectedTime)} // Update value in form
              >
                {`${String(selectedTime.hours).padStart(2, '0')}:${String(selectedTime.minutes).padStart(2, '0')}${selectedTime.seconds !== undefined ? `:${String(selectedTime.seconds).padStart(2, '0')}` : ''} ${selectedTime.period}`}
                <ClockIcon className="w-4 h-4 mr-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <TimePicker
                hours={selectedTime.hours}
                minutes={selectedTime.minutes}
                seconds={selectedTime.seconds}
                period={selectedTime.period}
                onChange={(newTime) => {
                  handleTimeChange(newTime)
                  field.onChange(newTime) // Update the form value with the new time
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormTimePicker
