import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../../services/auth.service'
import MiddlewareNotAuth from '../../../hoc/MiddlewareNotAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { formValuesLogin, IFormValuesLogin, schemaLogin } from '@validations/auth/login.validation'
import { Button } from '@/components/ui/button'
import swal from 'sweetalert'
import { saveTokens } from '../../../helpers/token'
import { useStoreUser } from '@stores/user.store'
import { useShallow } from 'zustand/react/shallow'
import FormInput from '@/components/global/moleculs/FormInput'

const LoginTeller: React.FC = () => {
  const user = useStoreUser(useShallow((state) => state))
  const [isSubmited, setIsSubmited] = useState(false)

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: formValuesLogin,
    resolver: yupResolver(schemaLogin)
  })

  const onSubmit = async (data: IFormValuesLogin) => {
    setIsSubmited(true)
    try {
      const dataBody = {
        username: data.username,
        password: data.password
      }
      const response = await authService.login(dataBody)
      const role = response?.data?.role

      if (response.success === false) {
        swal({
          title: 'Error',
          text: response?.message,
          icon: 'error',
          timer: 2000,
          buttons: false
        })
        reset()
        setIsSubmited(false)
        return
      }

      user.setIsUser(response?.data)

      if (role) {
        if (role === 'teller') {
          navigate('/teller', { replace: true })
        }
      }

      saveTokens(response?.token?.accessToken)
      setIsSubmited(false)
      return
    } catch (error) {
      setIsSubmited(false)
      reset()
      throw new Error(error as string)
    }
  }

  return (
    <>
      <div className="bg-primary-foreground w-[70%] md:w-[30%] p-10  rounded-md border-primary shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2 className="text-muted font-medium text-xl md:text-2xl">BNI Client</h2>
          <div className="grid grid-cols-1 gap-3 md:gap-4 mt-3 md:mt-5">
            <FormInput name="username" type="text" placeholder="Username" control={control} errors={errors} />

            <FormInput name="password" type={'password'} placeholder="Password" control={control} errors={errors} />

            <div className="flex items-center justify-between mt-3 bg-slate-200">
              <Button disabled={isSubmited} variant={'active'} type="submit" className="w-full shadow">
                {isSubmited ? 'Submitting' : 'Login'}
              </Button>
            </div>
          </div>
        </form>

        <p className="font-medium mt-5 text-right">Versi 1.0</p>
      </div>
    </>
  )
}

export default MiddlewareNotAuth(LoginTeller)
