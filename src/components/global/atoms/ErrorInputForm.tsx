import React from 'react'

interface IErrorInputForm {
  statusError: any
}

const ErrorInputForm: React.FC<IErrorInputForm> = ({ statusError }) => {
  return <>{statusError && <p className="mt-1 text-xs text-red-500">{statusError.message}</p>}</>
}
export default ErrorInputForm
