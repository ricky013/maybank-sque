import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormCalender from '@/components/global/moleculs/FormCalender'
import CustomCaptcha from '@/components/global/organism/CustomCaptcha'
import { formClientBooking, schemaClientBooking } from '@validations/booking.validation'
import { useNavigate } from 'react-router-dom'
import asetMotifHeaderCardCabang from '@assets/client/images/motif-header-card-cabang.svg'
import { useState } from 'react'
const Booking = () => {
  const navigate = useNavigate()
  const [isCaptchValid, setIsCaptchValid] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: formClientBooking,
    resolver: yupResolver(schemaClientBooking)
  })

  const onSubmit = async (data: { bookingDate: string }) => {
    try {
      alert(data?.bookingDate)
      return navigate('/tiket')
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => navigate('/layanan')}>
      <DialogContent className="w-[90%]  rounded-2xl bg-[#0A3848] border-primary">
        <DialogHeader>
          <DialogTitle className="text-center text-primary-foreground">Tanggal Booking</DialogTitle>
          <img src={asetMotifHeaderCardCabang} className="absolute left-0 top-0 -z-10" />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 ">
          <FormCalender
            className="flex gap-2 justify-start items-center "
            placeholder="Pilih Tanggal"
            name="bookingDate"
            label="Tanggal "
            control={control}
            errors={errors}
          />

          <CustomCaptcha onVerify={setIsCaptchValid} />

          <DialogFooter>
            <div className="w-full flex flex-col gap-2">
              <Button disabled={!isCaptchValid} className="bg-white text-black" type="submit">
                Kirim
              </Button>
              <Button className="bg-secondary text-white" onClick={() => navigate('/layanan')}>
                Batal
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Booking
