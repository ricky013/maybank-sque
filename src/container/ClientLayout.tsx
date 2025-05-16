import React from 'react'
import { Toaster } from 'sonner'
import { LOGO_SQUE } from '@utils/constants.ts'
import HeaderBooking from '@/components/client-panel/HeaderBooking'

type ClientLayoutProps = {
  children: React.ReactNode
}
const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-responsive flex flex-col items-center gap-3">
        <div className="h-[95vh] overflow-hidden flex flex-col w-[90%]">
          <div className="w-full relative flex justify-center items-center p-5 h-[10vh] min-h-[60px] max-h-[120px]">
            <HeaderBooking />
          </div>
          {children}
        </div>

        <div className="flex items-center justify-center w-full">
          <img src={LOGO_SQUE} className="w-24" />
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default ClientLayout
