/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ISelectDropdown {
  data: { value: string; label: string }[]
  name: string
  label?: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  placeholder: string
  control: any
}

const FormSelectDropdown: React.FC<ISelectDropdown> = ({
  name,
  data,
  label,
  errors,
  placeholder,
  control,
  customError
}) => {
  return (
    <div className="space-y-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full text-slate-800">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {data?.map((item: any) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormSelectDropdown
