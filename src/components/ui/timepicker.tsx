import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

// Props untuk TimePicker
export type TimePickerProps = {
  className?: string
  classNames?: { [key: string]: string }
  hours: number
  minutes: number
  seconds?: number // Detik menjadi opsional
  period: 'AM' | 'PM'
  onChange: (time: { hours: number; minutes: number; seconds?: number; period: 'AM' | 'PM' }) => void // Fungsi untuk menangani perubahan
}

// Komponen TimePicker untuk memilih jam, menit, dan detik
function TimePicker({ className, classNames, hours, minutes, seconds, period, onChange }: TimePickerProps) {
  // Fungsi untuk meningkatkan jam
  const increaseHours = () => {
    const newHours = hours === 12 ? 1 : hours + 1
    onChange({ hours: newHours, minutes, seconds, period })
  }

  // Fungsi untuk menurunkan jam
  const decreaseHours = () => {
    const newHours = hours === 1 ? 12 : hours - 1
    onChange({ hours: newHours, minutes, seconds, period })
  }

  // Fungsi untuk meningkatkan menit
  const increaseMinutes = () => {
    const newMinutes = minutes === 59 ? 0 : minutes + 1
    onChange({ hours, minutes: newMinutes, seconds, period })
  }

  // Fungsi untuk menurunkan menit
  const decreaseMinutes = () => {
    const newMinutes = minutes === 0 ? 59 : minutes - 1
    onChange({ hours, minutes: newMinutes, seconds, period })
  }

  // Fungsi untuk meningkatkan detik
  const increaseSeconds = () => {
    if (seconds !== undefined) {
      const newSeconds = seconds === 59 ? 0 : seconds + 1
      onChange({ hours, minutes, seconds: newSeconds, period })
    }
  }

  // Fungsi untuk menurunkan detik
  const decreaseSeconds = () => {
    if (seconds !== undefined) {
      const newSeconds = seconds === 0 ? 59 : seconds - 1
      onChange({ hours, minutes, seconds: newSeconds, period })
    }
  }

  // Fungsi untuk toggle AM/PM
  const togglePeriod = () => {
    onChange({ hours, minutes, seconds, period: period === 'AM' ? 'PM' : 'AM' })
  }

  return (
    <div className={cn('p-3', className)}>
      <div
        className={cn(
          'flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 items-center',
          classNames?.container
        )}
      >
        {/* Input Jam */}
        <div className={cn('flex flex-col items-center', classNames?.hours)}>
          <Button
            type="button"
            onClick={decreaseHours}
            className={cn(buttonVariants({ variant: 'outline' }), 'w-8 h-8 flex items-center justify-center')}
          >
            <ChevronUp className="absolute z-10 h-4 w-4 " />
          </Button>
          <span className="text-lg font-medium">{String(hours).padStart(2, '0')}</span>
          <Button
            type="button"
            onClick={increaseHours}
            className={cn(buttonVariants({ variant: 'outline' }), 'w-8 h-8 flex items-center justify-center')}
          >
            <ChevronDown className=" absolute z-10 h-4 w-4" />
          </Button>
        </div>

        {/* Separator : */}
        <span className="text-lg font-medium">:</span>

        {/* Input Menit */}
        <div className={cn('flex flex-col items-center', classNames?.minutes)}>
          <Button
            type="button"
            onClick={decreaseMinutes}
            className={cn(buttonVariants({ variant: 'outline' }), 'w-8 h-8 flex items-center justify-center')}
          >
            <ChevronUp className="absolute z-10 h-4 w-4 " />
          </Button>
          <span className="text-lg font-medium">{String(minutes).padStart(2, '0')}</span>
          <Button
            type="button"
            onClick={increaseMinutes}
            className={cn(buttonVariants({ variant: 'outline' }), 'w-8 h-8 flex items-center justify-center')}
          >
            <ChevronDown className="absolute z-10 h-4 w-4 " />
          </Button>
        </div>

        {/* Separator : */}
        <span className="text-lg font-medium">:</span>

        {/* Input Detik (Opsional) */}
        {seconds !== undefined && (
          <div className={cn('flex flex-col items-center', classNames?.seconds)}>
            <Button
              type="button"
              onClick={decreaseSeconds}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-8 h-8 flex items-center justify-center')}
            >
              <ChevronUp className="absolute z-10 h-4 w-4 " />
            </Button>
            <span className="text-lg font-medium">{String(seconds).padStart(2, '0')}</span>
            <Button
              type="button"
              onClick={increaseSeconds}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-8 h-8 flex items-center justify-center')}
            >
              <ChevronDown className="absolute z-10 h-4 w-4 " />
            </Button>
          </div>
        )}

        {/* AM/PM Toggle */}
        <div className={cn('flex flex-col items-center', classNames?.period)}>
          <button
            type="button"
            onClick={togglePeriod}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'px-2 h-8 flex items-center justify-center',
              'bg-blue-500 text-white'
            )}
          >
            {period === 'AM' ? 'AM' : 'PM'}
          </button>
        </div>
      </div>
    </div>
  )
}

TimePicker.displayName = 'TimePicker'

export { TimePicker }
