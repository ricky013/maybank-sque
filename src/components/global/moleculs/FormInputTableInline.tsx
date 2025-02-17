/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'
import { EyeClosedIcon } from '@radix-ui/react-icons'

interface IFormInput {
  name: string
  label?: string
  type: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  accept?: string
  placeholder: string
  control: any
  disabled?: boolean
}

const FormInput: React.FC<IFormInput> = ({
  name,
  label,
  type,
  errors,
  accept,
  placeholder,
  control,
  disabled,
  customError
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className="space-y-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <Input
              id={name}
              type={isPasswordVisible ? 'text' : type}
              accept={accept}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
            {type === 'password' && (
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setIsPasswordVisible((state) => !state)}
              >
                {isPasswordVisible ? (
                  <EyeIcon className="w-5 h-5 hover:text-primary transition" />
                ) : (
                  <EyeClosedIcon className="w-5 h-5 hover:text-primary transition" />
                )}
              </div>
            )}
          </div>
        )}
      />
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
      {customError?.status && <p className="mt-1 text-xs text-red-500">{customError.message}</p>}
    </div>
  )
}

export default FormInput
