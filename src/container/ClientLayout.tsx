import React from 'react'
import { Toaster } from 'sonner'

type ClientLayoutProps = {
  children: React.ReactNode
}
const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="min-h-screen">{children}</div>
        <Toaster />
      </div>
    </>
  )
}

export default ClientLayout
