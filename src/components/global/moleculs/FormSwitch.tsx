/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'
import { Switch } from '@/components/ui/switch'

interface IFormSwitch {
  name: string
  label: string
  errors: any
  control: any
  customError?: {
    status: boolean
    message: string
  }
}

const FormSwitch: React.FC<IFormSwitch> = ({ name, label, control, errors, customError }) => {
  return (
    <div className="space-x-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch id={name} checked={field.value} onCheckedChange={field.onChange} name={field.name} ref={field.ref} />
        )}
      />
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormSwitch
