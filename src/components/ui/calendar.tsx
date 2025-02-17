/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  startDate?: Date
  endDate?: Date
}

function Calendar({ className, classNames, showOutsideDays = true, startDate, endDate, ...props }: CalendarProps) {
  // Fungsi untuk menentukan apakah suatu hari berada dalam rentang tanggal yang dipilih
  const isInRange = (day: Date): boolean => {
    if (!startDate || !endDate) {
      return false // Kembalikan false jika tanggal awal atau akhir tidak ditetapkan
    }
    return day >= startDate && day <= endDate // Periksa apakah hari berada dalam rentang
  }

  // Fungsi untuk memeriksa apakah suatu hari adalah tanggal awal
  const isStartDate = (day: Date): boolean => {
    return startDate ? day.toDateString() === startDate.toDateString() : false
  }

  // Fungsi untuk memeriksa apakah suatu hari adalah tanggal akhir
  const isEndDate = (day: Date): boolean => {
    return endDate ? day.toDateString() === endDate.toDateString() : false
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      modifiers={{
        inRange: (day) => isInRange(day),
        startDate: (day) => isStartDate(day),
        endDate: (day) => isEndDate(day)
      }}
      modifiersClassNames={{
        // custom bg cell range tanggal start - end
        inRange: `bg-purple-400 text-primary-foreground `,
        startDate: 'bg-primary text-primary-foreground rounded-l-md',
        endDate: 'bg-primary text-primary-foreground rounded-r-md'
      }}
      classNames={{
        months: `flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 `,
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7  p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2 gap-1',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          '[&:has([aria-selected])]:bg-primary [&:has([aria-selected].day-outside)]:bg-primary/30',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-8 p-0 font-normal aria-selected:opacity-100'),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        // berikan class menggunakan class color yang ada ditailwind
        day_selected: `bg-purple-600 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-[#6f63e8] focus:text-primary-foreground '}`,
        day_today: 'bg-accent text-primary',
        day_outside:
          'day-outside text-muted opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted aria-selected:opacity-30',
        day_disabled: 'text-muted opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
