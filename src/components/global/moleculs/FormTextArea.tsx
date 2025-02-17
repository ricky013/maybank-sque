/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'
import { Textarea } from '@/components/ui/textarea'

interface IFormTextArea {
  name: string
  label: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  placeholder: string
  control: any
  disabled?: boolean
}

const FormTextArea: React.FC<IFormTextArea> = ({
  name,
  label,
  errors,
  placeholder,
  control,
  disabled,
  customError
}) => {
  return (
    <div className="space-y-2 grid grid-cols-1">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Textarea id={name} placeholder={placeholder} disabled={disabled} {...field} />}
      />
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormTextArea
