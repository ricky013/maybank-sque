/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group' // Sesuaikan import dengan lokasi file RadioGroup

interface IFormRadioButton {
  name: string
  label: string
  typeRadio?: 'checkbox' | 'bullet'
  options: { label: string; value: string }[] // List pilihan radio
  control: any
  errors: any
  customError?: {
    status: boolean
    message: string
  }
}

const FormRadioButton: React.FC<IFormRadioButton> = ({
  name,
  typeRadio,
  label,
  options,
  control,
  errors,
  customError
}) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-5">
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem typeRadio={typeRadio} value={option.value} id={`${name}-${option.value}`} />
                <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormRadioButton
