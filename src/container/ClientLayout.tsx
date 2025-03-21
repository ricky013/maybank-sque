import React from 'react'
import { Toaster } from 'sonner'
import { LOGO_SQUE } from '@utils/constants.js'

type ClientLayoutProps = {
  children: React.ReactNode
}
const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="min-h-screen overflow-hidden">{children}</div>

        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
          <img src={LOGO_SQUE} className="w-24" />
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default ClientLayout
