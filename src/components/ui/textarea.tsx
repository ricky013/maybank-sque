/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex md:min-h-[120px] min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed focus transition-all:shadow-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted  disabled:opacity-50 focus:border-2 focus:border-primary focus:ring-2 focus:ring-primary',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
