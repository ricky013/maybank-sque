import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const SkeletonTable: React.FC<{ title: string[]; rows?: number; colsSmall?: number; colsMedium?: number }> = ({
  title,
  rows = 4,
  colsSmall = 2,
  colsMedium = 4
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="rounded-xl p-3 w-full flex justify-around items-center text-secondary-foreground bg-secondary">
        {title.map((item, index) => (
          <h2 className={`md:text-sm text-xs ${index > 1 && 'xs:hidden md:block'}`} key={index}>
            {item}
          </h2>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-y-3">
        {/* Menghasilkan jumlah row yang dinamis pada media query handphone */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="w-full md:hidden block">
            <div className={`grid grid-cols-${colsSmall} gap-x-5 `}>
              {/* Menghasilkan jumlah kolom yang dinamis */}
              {[...Array(colsSmall)].map((_, colIndex) => (
                <Skeleton className="xs:h-2 md:h-4 w-full" key={colIndex} />
              ))}
            </div>
            <Separator className=" mt-3" />
          </div>
        ))}

        {/* Menghasilkan jumlah row yang dinamis */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="w-full hidden md:block">
            <div className={`grid  grid-cols-${colsMedium} gap-x-5 `}>
              {/* Menghasilkan jumlah kolom yang dinamis */}
              {[...Array(colsMedium)].map((_, colIndex) => (
                <Skeleton className="xs:h-2 md:h-4 w-full" key={colIndex} />
              ))}
            </div>
            <Separator className="mt-3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonTable
