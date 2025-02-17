/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'
import { Checkbox } from '@/components/ui/checkbox'

interface IFormCheckBox {
  data: any
  name: string
  label: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  control: any
}

const FormCheckBox: React.FC<IFormCheckBox> = ({ data, name, label, errors, control, customError }) => {
  return (
    <div className="border w-full h-full  overflow-y-auto space-y-2  p-2 rounded-md">
      <Label htmlFor={name}>{label}</Label>
      {data?.map((item: any) => (
        <Controller
          key={item.id}
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={field.value.includes(item.id)}
                onCheckedChange={() => {
                  const newValue = field.value.includes(item.id)
                    ? field.value.filter((val: string) => val !== item.id)
                    : [...field.value, item.id]
                  field.onChange(newValue)
                }}
              />
              <label htmlFor={item.id} className="text-secondary-foreground cursor-pointer">
                {item.nameKeahlian || item.nameMinat}
              </label>
            </div>
          )}
        />
      ))}
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormCheckBox
