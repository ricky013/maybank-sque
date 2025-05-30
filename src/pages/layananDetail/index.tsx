import CardJenisTransaksi from '@/components/client-panel/CardJenisTransaksi'
import EmptyData from '@/components/global/atoms/EmptyData'
import SkeletonCard from '@/components/global/atoms/SkeletonCard'
import FormCalender from '@/components/global/moleculs/FormCalender'
import FormInput from '@/components/global/moleculs/FormInput'
import CustomCaptcha from '@/components/global/organism/CustomCaptcha'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  useGetCodeBooking,
  useGetJenisTransaksiByCabangAndLayanan,
  useGetTanggalBooking
} from '@features/jenisTransaksi.feature'
import { formatDateToYYYYMMDD } from '@helpers/format'
import { yupResolver } from '@hookform/resolvers/yup'
import { formClientBooking, schemaClientBooking } from '@validations/booking.validation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

interface DataBody {
  cabangId: string
  layananId: string
  tanggal: string
  telepon: string
  jtIds: string
}

const LayananDetail = () => {
  const { cabangId, layananId } = useParams()
  const navigate = useNavigate()
  const [dataBody, setDataBody] = useState<DataBody>({
    cabangId: String(cabangId),
    layananId: String(layananId),
    tanggal: '',
    telepon: '',
    jtIds: ''
  })
  const {
    data: dataLayanan,
    isLoading,
    isError,
    error
  } = useGetJenisTransaksiByCabangAndLayanan(navigate, cabangId, layananId)
  const {
    data: dataBooking,
    // isLoading: isLoadingBooking,
    isError: isErrorBooking,
    error: errorBooking,
    refetch: submitBooking
  } = useGetCodeBooking(() => {}, dataBody)
  const {
    data: dataTanggal,
    // isLoading: isLoadingTanggal,
    // isError: isErrorTanggal,
    // error: errorTanggal,
    refetch: refetchTanggal
  } = useGetTanggalBooking(cabangId, layananId)

  const [arrLayanan, setArrLayanan] = useState<any[]>([])
  const [, setArrTanggal] = useState([])
  const [arrExclude, setArrExclude] = useState([])
  const [showModal, setShow] = useState(false)
  // const [captchaSuccess, setCaptchaSuccess] = useState(false)
  const [jtIdsSelected, setJtIdsSelected] = useState(false)
  const [namaJtIds, setNamaJtIds] = useState('')
  const [isCaptchValid, setIsCaptchValid] = useState(false)
  const [arrJtIds, setArrJtIds] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors
  } = useForm({
    defaultValues: formClientBooking,
    mode: 'onChange',
    resolver: yupResolver(schemaClientBooking)
  })

  const finishSelectJtIds = () => {
    handleClickLayanan()
  }

  const handleClickLayanan = () => {
    refetchTanggal()
    setShow(true)
  }

  const getButtonId = (e: React.MouseEvent<HTMLButtonElement>, item: any) => {
    setJtIdsSelected(true)
    const element = e.currentTarget
    element.style.display = 'none' // Sembunyikan elemen yang diklik

    setArrJtIds((prev) => [...prev, element.id]) // Update state dengan spread operator
    setNamaJtIds((prev) => `${prev} - ${item.teks}`) // Update namaJtIds dengan template string
  }

  const onSubmit = async (data: { bookingDate: string; telepon: string }) => {
    try {
      setDataBody({
        layananId: String(layananId),
        cabangId: String(cabangId),
        tanggal: formatDateToYYYYMMDD(new Date(data?.bookingDate)),
        jtIds: JSON.stringify(arrJtIds),
        telepon: data?.telepon
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  const showLagiSemuaCard = () => {
    arrLayanan.forEach((element) => {
      const cardElement = document.getElementById(element.id)
      if (cardElement) {
        cardElement.style.display = 'grid'
      } else {
        console.warn(`Elemen dengan id ${element.id} tidak ditemukan.`)
      }
    })
    setJtIdsSelected(false)
    setArrJtIds([])
    setNamaJtIds('')
  }

  useEffect(() => {
    setValue('jtSelected', namaJtIds)
  }, [namaJtIds])

  useEffect(() => {
    if (dataLayanan?.length >= 1) {
      setArrLayanan(dataLayanan)
    }
  }, [dataLayanan])

  useEffect(() => {
    if (dataTanggal) {
      setArrTanggal(dataTanggal)
      setArrExclude(dataTanggal.excludeDates)
    }
  }, [dataTanggal])

  useEffect(() => {
    if (dataBody.jtIds === '') {
      console.error('DataBody is required before fetching')
      return
    }
    submitBooking()
  }, [dataBody])

  useEffect(() => {
    if (dataBooking) {
      navigate(dataBooking.linkNavigate)
    }
  }, [dataBooking])

  useEffect(() => {
    if (isError) {
      toast.error(error?.message)
    }
  }, [isError])

  useEffect(() => {
    if (isErrorBooking) {
      toast.error(errorBooking.message)
    }
  }, [isErrorBooking])

  useEffect(() => {
    if (!showModal) {
      showLagiSemuaCard()
      reset(formClientBooking)
    }
    clearErrors()
  }, [showModal])

  return (
    <section className="flex flex-col gap-3 min-h-[80vh]">
      <span className="w-full flex flex-col gap-1">
        <h2 className="font-medium text-left text-xl  md:text-2xl">Pilih Jenis Transaksi :</h2>
        <Button onClick={() => finishSelectJtIds()} disabled={!jtIdsSelected}>
          PESAN
        </Button>
      </span>
      <div className="overflow-auto wrapper-cabang rounded-3xl p-5 flex-grow">
        {isLoading ? (
          <SkeletonCard type="card" count={2} />
        ) : arrLayanan?.length > 0 ? (
          <CardJenisTransaksi
            data={arrLayanan}
            action={(e: React.MouseEvent<HTMLButtonElement>, teks: any) => {
              getButtonId(e, teks)
            }}
          />
        ) : (
          <EmptyData />
        )}
      </div>

      <Dialog
        open={showModal}
        onOpenChange={() => {
          setShow(false)
        }}
      >
        <DialogContent className="w-[90%] rounded-[24px] bg-[url(/src/assets/client/images/bg-popup.svg)] bg-no-repeat bg-cover border-none">
          <DialogHeader>
            <DialogTitle className="text-center">Tanggal Booking</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 ">
            <FormInput
              label="Transaksi Terpilih"
              name="jtSelected"
              placeholder=""
              control={control}
              errors={errors}
              type="text"
              disabled
            />
            <FormInput
              label="No Telepon"
              name="telepon"
              placeholder="Masukan No Telepon"
              control={control}
              errors={errors}
              type="text"
            />
            <FormCalender
              className="grid gap-2 "
              placeholder="Pilih Tanggal"
              name="bookingDate"
              label="Tanggal "
              control={control}
              errors={errors}
              excludeDate={arrExclude}
            />

            <CustomCaptcha onVerify={setIsCaptchValid} />

            <DialogFooter>
              <div className="w-full flex flex-col gap-2">
                <Button disabled={!isCaptchValid} className="bg-white text-black" type="submit">
                  Kirim
                </Button>
                <Button className="bg-black text-white" onClick={() => setShow(false)}>
                  Batal
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default LayananDetail
