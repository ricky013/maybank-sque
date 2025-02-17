/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const isFile = type === 'file'

  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border-2 bg-transparent px-3 py-1 text-sm focus transition-all:shadow-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:border-2 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary',

        // add style jika type input adalah file
        isFile &&
          "file:bg-muted file:rounded file:text-xs file:font-normal file:text-center file:mt-1 file:text-white file:before:content-['Pilih File']",

        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
