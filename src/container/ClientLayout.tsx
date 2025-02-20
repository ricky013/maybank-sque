import React from 'react'
import { Toaster } from 'sonner'
import LogoSque from './../assets/client/icons/logo-sque.svg'

type ClientLayoutProps = {
  children: React.ReactNode
}
const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="min-h-screen overflow-hidden">{children}</div>

        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
          <img src={LogoSque} className="w-[117px]" />
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default ClientLayout
