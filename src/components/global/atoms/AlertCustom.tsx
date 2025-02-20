import React from 'react'

function AlertCustom({ message }: { message: string }) {
  return (
    <div className="text-[rgba(3, 76, 28, 1)] bg-[#C9F1C6] w-full justify-center flex items-center">
      <span className="text-base">{message}</span>
    </div>
  )
}

export default AlertCustom
