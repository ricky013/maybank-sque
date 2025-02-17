import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ErrorInputForm from '@/components/global/atoms/ErrorInputForm'

interface IFormInputPreviewImage {
  dataResponseImage?: {
    imageUrl: string
    imageName: string
    imageFile: any
  }
  name: string
  label?: string
  errors: any
  placeholder: string
  control: any
}

const FormInputPreviewImage: React.FC<IFormInputPreviewImage> = ({
  dataResponseImage,
  name,
  label,
  control,
  errors,
  placeholder
}) => {
  const [dataImage, setDataImage] = React.useState({ imageUrl: '', imageName: '', imageFile: '' })

  useEffect(() => {
    if (dataResponseImage) {
      setDataImage({
        imageUrl: dataResponseImage.imageUrl,
        imageName: dataResponseImage.imageName,
        imageFile: dataResponseImage.imageFile
      })
    }
  }, [dataResponseImage])

  const classNameInput =
    'flex h-9 w-full rounded-md border-2 border-secondary bg-transparent px-3 py-1 text-sm focus transition-all:shadow-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:border-2 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary'
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex flex-center">
        <Avatar className="h-[4rem] w-[4rem]">
          <AvatarImage src={dataImage.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className={`relative ${classNameInput}`}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between w-full overflow-hidden ">
              <span
                className={`w-[70%]  line-clamp-1 ${dataImage.imageName ? 'text-secondary-foreground' : 'text-[#A6A6A6]'}`}
              >
                {dataImage.imageName || 'Tidak Ada Foto Profile'}
              </span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                id={name}
                placeholder={placeholder}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setDataImage({
                      imageUrl: URL.createObjectURL(file),
                      imageFile: file,
                      imageName: file.name
                    })
                    field.onChange(e.target.files) // Set the file in the field
                  }
                }}
              />
              <label
                htmlFor={name}
                className="absolute bg-primary top-0 right-0 rounded-md h-full w-[30%] flex-center text-primary-foreground cursor-pointer z-10"
              >
                Pilih File
              </label>
            </div>
          )}
        />
      </div>
      {errors[name] && <ErrorInputForm statusError={errors[name]} />}
    </div>
  )
}

export default FormInputPreviewImage
