import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonCard: React.FC<{ count: number; type?: string }> = ({ count, type = 'card' }) => {
  return (
    <>
      {(() => {
        switch (type) {
          case 'card':
            return (
              <div className={`grid grid-cols-1 w-full gap-3 `}>
                {[...Array(count)].map((_, index) => (
                  <div key={index} className="w-full ">
                    <div className="p-4 shadow-md rounded-md   flex flex-col space-y-3">
                      {/* Placeholder skeleton elements inside each card */}
                      <Skeleton className="h-3 w-[20%]" />
                      <Skeleton className="h-2 w-full" />
                      <Skeleton className="h-2 w-5/6" />
                      <Skeleton className="h-2 w-5/6" />
                      <Skeleton className="h-2 w-5/6" />
                      <Skeleton className="h-2 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )
          case 'cardCarousel':
            return (
              <>
                <div className="flex gap-3">
                  {Array.from({ length: count }).map((_, index) => (
                    <div className="w-64 p-2 rounded-sm shadow-lg bg-slate-100 h-32 grid grid-cols-1 gap-1" key={index}>
                      {/* Placeholder skeleton elements inside each card */}
                      <Skeleton className="h-3 w-[50%]" />
                      <Skeleton className="h-2 w-full" />
                      <Skeleton className="h-2 w-5/6" />
                      <Skeleton className="h-2 w-5/6" />
                      <Skeleton className="h-2 w-5/6" />
                      <Skeleton className="h-2 w-2/3" />
                    </div>
                  ))}
                </div>
              </>
            )
          case 'select':
            return (
              <>
                <div className="flex gap-3">
                  {Array.from({ length: count }).map((_, index) => (
                    <div className="w-full p-2 rounded-sm shadow-lg bg-slate-100 grid grid-cols-1 gap-1" key={index}>
                      {/* Placeholder skeleton elements inside each card */}
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              </>
            )
          default:
            return null
        }
      })()}
    </>
  )
}

export default SkeletonCard
