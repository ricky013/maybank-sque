import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const SkeletonModal: React.FC<{ type: string; rows?: number; colsSmall?: number; colsMedium?: number }> = ({
  type,
  rows = 4,
  colsSmall = 2,
  colsMedium = 4
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex relative mb-2 justify-between items-center gap-4">
        <Skeleton className="h-3 w-[50%] " />
        <div className="absolute z-10 -top-2 -right-3">
          <span className="h-6 bg-secondary block w-6 rounded-full"></span>
        </div>
      </div>

      {(() => {
        switch (type) {
          case 'form':
            return (
              <>
                <div className="grid grid-cols-1 gap-y-3">
                  {/* Dynamic baris small screens */}
                  {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="w-full md:hidden block">
                      <div className={`grid grid-cols-${colsSmall} gap-x-5`}>
                        {/* Dynamic columns for small screens */}
                        {[...Array(colsSmall)].map((_, colIndex) => (
                          <div className="grid grid-cols-1 gap-3" key={colIndex}>
                            <Skeleton className="xs:h-2  w-[20%]" />
                            <Skeleton className="xs:h-2  w-full" />
                          </div>
                        ))}
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}

                  {/* Dynamic baris medium screen  */}
                  {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="w-full hidden md:block">
                      <div className={`grid grid-cols-${colsMedium} gap-x-5`}>
                        {/* Dynamic columns for medium screens */}
                        {[...Array(colsMedium)].map((_, colIndex) => (
                          <div className="grid grid-cols-1 gap-3" key={colIndex}>
                            <Skeleton className="h-2 w-[20%]" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}
                </div>
              </>
            )
          case 'preview':
            return (
              <>
                <div className="w-full flex-center ">
                  <Skeleton className="h-20 w-20 md:h-24 md:w-24 rounded-full " />
                </div>

                <div className="grid grid-cols-1 gap-y-3">
                  {/* Dynamic baris small screens */}
                  {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="w-full md:hidden block">
                      <div className={`grid grid-cols-${colsSmall} gap-x-5`}>
                        {/* Dynamic columns for small screens */}
                        {[...Array(colsSmall)].map((_, colIndex) => (
                          <div className="grid grid-cols-1 gap-3" key={colIndex}>
                            <Skeleton className="xs:h-2  w-[20%]" />
                            <Skeleton className="xs:h-2  w-full" />
                          </div>
                        ))}
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}

                  {/* Dynamic baris medium screen  */}
                  {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="w-full hidden md:block">
                      <div className={`grid grid-cols-${colsMedium} gap-x-5`}>
                        {/* Dynamic columns for medium screens */}
                        {[...Array(colsMedium)].map((_, colIndex) => (
                          <div className="grid grid-cols-1 gap-3" key={colIndex}>
                            <Skeleton className="h-2 w-[20%]" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}
                </div>
              </>
            )
          default:
            return null
        }
      })()}

      <div className="w-full flex justify-end">
        <Skeleton className="h-6 w-[30%] rounded-md" />
      </div>
    </div>
  )
}

export default SkeletonModal
