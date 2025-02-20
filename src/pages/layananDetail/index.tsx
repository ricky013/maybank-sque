import CardJenisTransaksi from '@/components/client-panel/CardJenisTransaksi'
import Header from '@/components/client-panel/Header'
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
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const LayananDetail = () => {
  const { cabangId, layananId } = useParams()
  const navigate = useNavigate()
  const [dataBody, setDataBody] = useState()
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
  } = useGetTanggalBooking(navigate, cabangId, layananId)

  const [arrLayanan, setArrLayanan] = useState([])
  const [, setArrTanggal] = useState([])
  const [arrExclude, setArrExclude] = useState([])
  const [showModal, setShow] = useState(false)
  // const [captchaSuccess, setCaptchaSuccess] = useState(false)
  const [jtIdsSelected, setJtIdsSelected] = useState(false)
  const [namaJtIds, setNamaJtIds] = useState('')
  const [isCaptchValid, setIsCaptchValid] = useState(false)
  const [arrJtIds, setArrJtIds] = useState([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: formClientBooking,
    resolver: yupResolver(schemaClientBooking)
  })

  const finishSelectJtIds = () => {
    handleClickLayanan()
  }

  const handleClickLayanan = () => {
    refetchTanggal(cabangId, layananId)
    setShow(true)
  }

  const getButtonId = (e: React.MouseEvent<HTMLButtonElement>, teks: any) => {
    setJtIdsSelected(true)
    const element = e.currentTarget
    element.style.display = 'none' // Sembunyikan elemen yang diklik

    setArrJtIds((prev) => [...prev, element.id]) // Update state dengan spread operator
    setNamaJtIds((prev) => `${prev} - ${teks.teks}`) // Update namaJtIds dengan template string
  }

  const onSubmit = async (data: { bookingDate: string }) => {
    try {
      setDataBody({
        layananId,
        cabangId,
        tanggal: formatDateToYYYYMMDD(new Date(data?.bookingDate)),
        jtIds: JSON.stringify(arrJtIds)
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
    setDataBody()
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
    if (!dataBody || Object.keys(dataBody).length === 0) {
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
      reset()
    }
  }, [showModal])

  return (
    <>
      <section className="w-full h-screen bg-[url('/src/assets/client/images/sm-bg.svg')] lg:bg-[url('/src/assets/client/images/lg-bg.svg')] z-10 bg-cover  bg-center bg-no-repeat">
        <Header />
        <div className="pt-20 lg:pt-24 w-[90%] mx-auto h-screen grid grid-rows-11 gap-1">
          <span className="w-full flex flex-col gap-1">
            <h2 className="font-medium text-left text-xl  md:text-2xl">Jenis Transaksi</h2>
            <Button onClick={() => finishSelectJtIds()} disabled={!jtIdsSelected}>
              PESAN
            </Button>
          </span>
          {/* <p className="sm:text-base text-sm text-center">
            {data?.alamat} {data?.kota?.name} {data?.kota?.provinsi?.name}
          </p> */}
          <div className="overflow-auto row-start-2 row-end-11 wrapper-cabang rounded-3xl p-3">
            {isLoading ? (
              <SkeletonCard type="card" count={2} />
            ) : arrLayanan?.length > 0 ? (
              <CardJenisTransaksi data={arrLayanan} action={{ e: getButtonId }} />
            ) : (
              <EmptyData />
            )}
          </div>
        </div>
      </section>
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
      <Outlet />
    </>
  )
}

export default LayananDetail
