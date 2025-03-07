import Header from '@/components/client-panel/Header'
import AlertCustom from '@/components/global/atoms/AlertCustom.js'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import iconPenilaian from '@assets/client/icons/icon-penilaian.png'
import asetLogo from '@assets/client/images/logo-maybank.svg'
import { useGetTicket, useSendSurvey } from '@features/ticket.feature.'
import { ClockIcon, Copy, Download, Home, Save, Share2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { createRef, useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { createFileName, useScreenshot } from 'use-react-screenshot'

const ClientTiket = () => {
  const RefTicket = createRef(null)
  const [, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  })

  const navigate = useNavigate()
  const { kodeBooking, tanggalBooking } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  // const [show, setShow] = useState(false)
  const [rating, setRating] = useState(0)
  const [catatanSurvei, setCatatanSurvei] = useState('')

  const [statusTicket, setStatusTicket] = useState('BOOKED')

  const [dataEticket, setDataEticket] = useState({
    cabangId: '',
    namaCabang: '',
    alamat: '',
    nomorTelepon: '',
    antrian: '',
    antrianTerakhir: '',
    catatanSurvei: '',
    counter: '',
    durasiLayanan: '',
    durasiTunggu: '',
    jamBooking: '',
    jamCheckIn: '',
    jamFinish: '',
    jamPanggil: '',
    jamServe: '',
    jenisTransaksi: '',
    kodeBooking: '',
    layanan: '',
    linkNavigate: '',
    linkTiket: '',
    menunggu: '',
    petugas: '',
    status: '',
    statusTicket: '',
    statusTeks: '',
    surveiId: '',
    tanggal: '',
    tanggalBooking: ''
  })

  const {
    data: dataTicket,
    // isLoading: isLoadingTicket,
    // isError: isErrorTicket,
    // error: errorTicket,
    refetch: fetchTicket
  } = useGetTicket(() => {}, kodeBooking, tanggalBooking)
  const {
    data: dataSendSurvey,
    // isLoading: isLoadingSendSurvey,
    // isError: isErrorSendSurvey,
    // error: errorSendSurvey,
    refetch: refetchSendSurvey
  } = useSendSurvey(() => {}, kodeBooking, tanggalBooking, rating, catatanSurvei)

  const download = (image, { name = `maybank_eTicket-${kodeBooking}`, extension = 'jpg' } = {}) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }

  const downloadScreenshot = () => takeScreenShot(RefTicket.current).then(download)

  const saveBookmarks = () => {
    const copyText = dataEticket.linkTiket
    navigator.clipboard.writeText(copyText)

    toast.success('Link tiket berhasil disalin')
  }

  const share = () => {
    const message = window.location.href
    const win = window.open(`https://wa.me/?text=${message}`, '_blank')

    const closeTab = () => {
      win?.close()
    }
    setTimeout(closeTab, 2000)
  }

  useEffect(() => {
    const init = setInterval(() => {
      fetchTicket()
    }, 5000)

    return () => {
      clearInterval(init)
    }
  }, [])

  useEffect(() => {
    if (!dataTicket) return
    setDataEticket(dataTicket)
    setStatusTicket(dataTicket.status)
  }, [dataTicket])

  useEffect(() => {
    if (!dataSendSurvey || Object.keys(dataSendSurvey).length === 0) return
    fetchTicket()
    setIsOpen(true)
  }, [dataSendSurvey])

  // useEffect(() => {
  //   if (isError) {
  //     toast.custom((t) => <ToastSonnerError message={error.message} t={t} toast={toast} />, { duration: Infinity })
  //   }
  // }, [isError, error])

  const DialogPenilaian = () => {
    return (
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-[url(/src/assets/client/images/bg-popup.svg)] bg-cover bg-no-repeat bg-center border-none w-[90%]">
          <DialogHeader>
            {/* <img src={asetMotifHeaderCardCabang} className="absolute left-0 top-0 -z-10" /> */}
          </DialogHeader>

          <div className="flex-center flex-col gap-3 text-white">
            <div className="flex-center">
              <img src={iconPenilaian} alt="icon penilaian" className="object-cover object-center" />
            </div>
            <p className="font-medium">Terimakasih Atas Penilaian Anda</p>
            <DialogFooter>
              <Button className=" px-7" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <section className="w-full overflow-hidden h-screen bg-responsive p-3 relative">
      <Header displayLogo={false} />
      <div className="w-full h-[90%] flex flex-col items-center justify-center gap-5 relative overflow-auto">
        <div className="md:w-1/2 lg:w-[30%] z-10 px-[3rem] py-5 eticket-card" ref={RefTicket}>
          <div className="w-full flex-center flex-col gap-1 text-center">
            <img src={asetLogo} alt="motif header" className="object-cover  object-center w-28 h-auto" />
            <h1 className="font-medium text-xl md:text-2xl">{dataEticket?.namaCabang}</h1>
            <p className="font-normal text-xs md:text-base text-center">{dataEticket?.alamat}</p>
            <h2 className="font-medium text-xl md:text-2xl text-blueTone">{dataEticket.status}</h2>
            <AlertCustom message={dataEticket.statusTeks} />
          </div>

          <div className="w-full flex-center flex-col gap-3">
            <Separator className="bg-primary my-3 h-[1px]" />

            {statusTicket === 'BOOKED' && (
              // BOOKED
              <div className="grid gap-3 w-full">
                <div className="grid gap-3">
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="book-label-sm">Nomor Antrian Anda</label>
                      <b className="book-label-xl">{dataEticket.antrian}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="book-label-sm">Layanan</label>
                      <b className="book-label-xl">{dataEticket.layanan}</b>
                    </span>
                  </div>
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className=" book-label-sm">Kode Booking</label>
                      <b className=" book-label-xl">{dataEticket.kodeBooking}</b>
                    </span>
                    <span className="grid text-center">
                      <label className=" book-label-sm">Tanggal Booking</label>
                      <b className=" book-label-lg" style={{ textTransform: 'capitalize' }}>
                        {dataEticket.tanggal}
                      </b>
                    </span>
                  </div>
                </div>
                <div className="grid text-center justify-center">
                  <p style={{ paddingBottom: '0.5em' }}>Kode QR</p>
                  <QRCodeSVG
                    value={dataEticket.kodeBooking}
                    // onClick={() => setShow(true)}
                  />
                </div>
                <Separator className="bg-primary my-3 h-[1px]" />
                <div className="row qr text-center text-blueTone text-xs">
                  Tanggal dicetak : {dataEticket.tanggalBooking}
                </div>
              </div>
            )}
            {statusTicket === 'CHECKIN' && (
              // CHECKIN
              <div className="body-ticket w-full grid gap-1">
                <div className="grid gap-3 text-center">
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="book-label-sm">Nomor Antrian Anda</label>
                      <b className="book-label-xl">{dataEticket.antrian}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="book-label-sm">Layanan</label>
                      <b className="book-label-xl">{dataEticket.layanan}</b>
                    </span>
                  </div>
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="col chekin-label-sm">Antrian Terakhir</label>
                      <b className="col chekin-label-xl">{dataEticket.antrianTerakhir}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="col chekin-label-sm">Kode Booking</label>
                      <b className="col chekin-label-xl">{dataEticket.kodeBooking}</b>
                    </span>
                  </div>
                </div>
                <Separator className="bg-primary my-3 h-[1px]" />
                <div className="text-blueTone grid gap-3">
                  <div className="text-xs grid grid-cols-2">
                    <span>
                      <p>Tanggal Booking</p>
                      <p>
                        <b>{dataEticket.tanggal}</b>
                      </p>
                    </span>
                    <span>
                      <p>Jam Check-In</p>
                      <p>
                        <b>{dataEticket.jamCheckIn}</b>
                      </p>
                    </span>
                  </div>
                  <div className="text-xs grid grid-cols-2">
                    <span>
                      <p>Menunggu</p>
                      <p>
                        <b>{dataEticket.menunggu} Antrian</b>
                      </p>
                    </span>
                    <span className="pb-1">
                      <p>Jam Panggil</p>
                      <p>
                        <b>{dataEticket.jamPanggil}</b>
                      </p>
                    </span>
                  </div>
                  <Separator className="bg-primary my-3 h-[1px]" />
                  <div className="flex justify-between text-xs">
                    <p>Tanggal dicetak : {dataEticket.tanggalBooking}</p>
                    <p>Jam : {dataEticket.jamBooking}</p>
                  </div>
                </div>
              </div>
            )}
            {statusTicket === 'CALLED' && (
              // CHECKIN
              <div className="body-ticket w-full grid gap-1">
                <div className="grid gap-3 text-center">
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="book-label-sm">Nomor Antrian Anda</label>
                      <b className="book-label-xl">{dataEticket.antrian}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="book-label-sm">Layanan</label>
                      <b className="book-label-xl">{dataEticket.layanan}</b>
                    </span>
                  </div>
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="col chekin-label-sm">Jenis Transaksi</label>
                      <b className="col chekin-label-sm text-uppercase">{dataEticket.jenisTransaksi || '-'}</b>
                    </span>
                  </div>
                  <div className="bg-yellowTone grid grid-cols-2 rounded py-3">
                    <span className="grid text-center">
                      <label>Petugas</label>
                      <b className="text-3xl font-bold">{dataEticket.petugas}</b>
                    </span>
                    <span className="grid text-center">
                      <label>Counter</label>
                      <b className="text-3xl font-bold">{dataEticket.counter}</b>
                    </span>
                  </div>
                </div>
                <Separator className="bg-primary my-3 h-[1px]" />
                <div className="grid text-xs text-blueTone gap-1">
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Durasi Tunggu</p>
                        <p>
                          <b>{dataEticket.durasiTunggu}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Check-In</p>
                        <p>
                          <b>{dataEticket.jamCheckIn}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Menunggu</p>
                        <p>
                          <b>{dataEticket.menunggu} Antrian</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Panggil</p>
                        <p>
                          <b>{dataEticket.jamPanggil}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <Separator className="bg-primary my-3 h-[1px]" />
                  <div className="flex justify-between text-xs italic">
                    {/* <span className="flex gap-1">
                      <CalendarIcon className="w-4 h-4 " /> */}
                    <p>Tanggal dicetak : {dataEticket.tanggalBooking}</p>
                    {/* </span>
                    <span className="flex gap-1">
                      <ClockIcon className="w-4 h-4" /> */}
                    <p>Jam : {dataEticket.jamBooking}</p>
                    {/* </span> */}
                  </div>
                </div>
              </div>
            )}
            {statusTicket === 'SERVING' && (
              // SERVING
              <div className="body-ticket w-full grid gap-1">
                <div className="grid gap-3 text-center">
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="book-label-sm">Nomor Antrian Anda</label>
                      <b className="book-label-xl">{dataEticket.antrian}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="book-label-sm">Layanan</label>
                      <b className="book-label-xl">{dataEticket.layanan}</b>
                    </span>
                  </div>
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="col chekin-label-sm">Jenis Transaksi</label>
                      <b className="col chekin-label-sm text-uppercase">{dataEticket.jenisTransaksi || '-'}</b>
                    </span>
                  </div>
                  <div className="bg-yellowTone grid grid-cols-2 rounded py-3">
                    <span className="grid text-center">
                      <label>Petugas</label>
                      <b className="text-3xl font-bold">{dataEticket.petugas}</b>
                    </span>
                    <span className="grid text-center">
                      <label>Counter</label>
                      <b className="text-3xl font-bold">{dataEticket.counter}</b>
                    </span>
                  </div>
                </div>
                <Separator className="bg-primary my-3 h-[1px]" />
                <div className="grid text-xs text-blueTone gap-1">
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Durasi Tunggu</p>
                        <p>
                          <b>{dataEticket.durasiTunggu}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Check-In</p>
                        <p>
                          <b>{dataEticket.jamCheckIn}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Menunggu</p>
                        <p>
                          <b>{dataEticket.menunggu} Antrian</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Serve</p>
                        <p>
                          <b>{dataEticket.jamServe}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <Separator className="bg-primary my-3 h-[1px]" />
                  <div className="flex justify-between text-xs italic">
                    {/* <span className="flex gap-1">
                      <CalendarIcon className="w-4 h-4 " /> */}
                    <p>Tanggal dicetak : {dataEticket.tanggalBooking}</p>
                    {/* </span>
                    <span className="flex gap-1">
                      <ClockIcon className="w-4 h-4" /> */}
                    <p>Jam : {dataEticket.jamBooking}</p>
                    {/* </span> */}
                  </div>
                </div>
              </div>
            )}
            {statusTicket === 'FINISH' && (
              <div className="body-ticket w-full grid gap-1">
                <div className="grid gap-3 text-center">
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="book-label-sm">Nomor Antrian Anda</label>
                      <b className="book-label-xl">{dataEticket.antrian}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="book-label-sm">Layanan</label>
                      <b className="book-label-xl">{dataEticket.layanan}</b>
                    </span>
                  </div>
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="col chekin-label-sm">Jenis Transaksi</label>
                      <b className="col chekin-label-sm text-uppercase">{dataEticket.jenisTransaksi || '-'}</b>
                    </span>
                  </div>
                  <div className="bg-yellowTone grid grid-cols-2 rounded py-3">
                    <span className="grid text-center">
                      <label>Petugas</label>
                      <b className="text-3xl font-bold">{dataEticket.petugas}</b>
                    </span>
                    <span className="grid text-center">
                      <label>Counter</label>
                      <b className="text-3xl font-bold">{dataEticket.counter}</b>
                    </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <ReactStars
                      count={5}
                      onChange={(newRating: any) => setRating(newRating)}
                      size={50}
                      activeColor="#ffd700"
                    />
                    <Input
                      type="text"
                      placeholder="Tulis komentar di sini ..."
                      value={catatanSurvei}
                      onChange={(e) => setCatatanSurvei(e.target.value)}
                    />
                  </div>
                </div>
                <Separator className="bg-primary my-3 h-[1px]" />
                <div className="grid text-xs text-blueTone gap-1">
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Durasi Tunggu</p>
                        <p>
                          <b>{dataEticket.durasiTunggu}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Check-In</p>
                        <p>
                          <b>{dataEticket.jamCheckIn}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Durasi Layanan</p>
                        <p>
                          <b>{dataEticket.durasiLayanan}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Panggil</p>
                        <p>
                          <b>{dataEticket.jamPanggil}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Serve</p>
                        <p>
                          <b>{dataEticket.jamServe}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Finish</p>
                        <p>
                          <b>{dataEticket.jamFinish}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <Separator className="bg-primary my-3 h-[1px]" />
                  <div className="flex justify-between text-xs italic">
                    {/* <span className="flex gap-1">
                      <CalendarIcon className="w-4 h-4 " /> */}
                    <p>Tanggal dicetak : {dataEticket.tanggalBooking}</p>
                    {/* </span>
                    <span className="flex gap-1">
                      <ClockIcon className="w-4 h-4" /> */}
                    <p>Jam : {dataEticket.jamBooking}</p>
                    {/* </span> */}
                  </div>
                </div>
              </div>
            )}
            {statusTicket === 'FEEDBACK' && (
              <div className="body-ticket w-full grid gap-1">
                <div className="grid gap-3 text-center">
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="book-label-sm">Nomor Antrian Anda</label>
                      <b className="book-label-xl">{dataEticket.antrian}</b>
                    </span>
                    <span className="grid text-center">
                      <label className="book-label-sm">Layanan</label>
                      <b className="book-label-xl">{dataEticket.layanan}</b>
                    </span>
                  </div>
                  <div className="grid grid-flow-col grid-cols-2">
                    <span className="grid text-center">
                      <label className="col chekin-label-sm">Jenis Transaksi</label>
                      <b className="col chekin-label-sm text-uppercase">{dataEticket.jenisTransaksi || '-'}</b>
                    </span>
                  </div>
                  <div className="bg-yellowTone grid grid-cols-2 rounded py-3">
                    <span className="grid text-center">
                      <label>Petugas</label>
                      <b className="text-3xl font-bold">{dataEticket.petugas}</b>
                    </span>
                    <span className="grid text-center">
                      <label>Counter</label>
                      <b className="text-3xl font-bold">{dataEticket.counter}</b>
                    </span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <ReactStars count={5} size={50} activeColor="#ffd700" edit={false} value={dataEticket.surveiId} />
                    <Input type="text" value={dataEticket.catatanSurvei} disabled />
                  </div>
                </div>
                <Separator className="bg-primary my-3 h-[1px]" />
                <div className="grid text-xs text-blueTone gap-1">
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Durasi Tunggu</p>
                        <p>
                          <b>{dataEticket.durasiTunggu}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Check-In</p>
                        <p>
                          <b>{dataEticket.jamCheckIn}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Durasi Layanan</p>
                        <p>
                          <b>{dataEticket.durasiLayanan}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Panggil</p>
                        <p>
                          <b>{dataEticket.jamPanggil}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Serve</p>
                        <p>
                          <b>{dataEticket.jamServe}</b>
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className="grid">
                        <p>Jam Finish</p>
                        <p>
                          <b>{dataEticket.jamFinish}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                  <Separator className="bg-primary my-3 h-[1px]" />
                  <div className="flex justify-between text-xs italic">
                    {/* <span className="flex gap-1">
                      <CalendarIcon className="w-4 h-4 " /> */}
                    <p>Tanggal dicetak : {dataEticket.tanggalBooking}</p>
                    {/* </span>
                    <span className="flex gap-1">
                      <ClockIcon className="w-4 h-4" /> */}
                    <p>Jam : {dataEticket.jamBooking}</p>
                    {/* </span> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {statusTicket === 'BOOKED' && (
          <div className="z-10 grid grid-cols-3 gap-3 w-full md:w-1/2 lg:w-[30%]">
            <Button className="w-full bg-blackTone text-white flex gap-1" onClick={() => downloadScreenshot()}>
              <Download className="w-4 h-4 " />
              Unduh
            </Button>
            <Button
              className="w-full bg-blackTone text-white flex gap-1"
              onClick={() => {
                saveBookmarks()
              }}
            >
              <Copy className="w-4 h-4 " />
              Salin
            </Button>
            <Button className="w-full bg-blackTone text-white flex gap-1" onClick={() => share()}>
              <Share2 className="w-4 h-4 " />
              Bagikan
            </Button>
          </div>
        )}
        {statusTicket === 'CHECKIN' || statusTicket === 'CALLED' || statusTicket === 'SERVING' ? (
          <div className="z-10 w-full md:w-1/2 lg:w-[30%]">
            <Button
              className="w-full bg-blackTone text-white flex gap-1"
              onClick={() => {
                saveBookmarks()
              }}
            >
              <Copy className="w-4 h-4 " />
              Salin
            </Button>
          </div>
        ) : null}
        {statusTicket === 'FINISH' && (
          <div className="z-10 md:w-1/2 lg:w-[30%]  w-full grid grid-cols-1 justify-items-center gap-2">
            <Button
              className="w-full flex-center items-center gap-3 bg-blackTone text-white"
              onClick={() => refetchSendSurvey()}
            >
              <Save className="w-4 h-4 " />
              Simpan Penilaian
            </Button>
          </div>
        )}
        {statusTicket === 'FEEDBACK' || statusTicket === 'EXPIRED' ? (
          <div className="z-10 md:w-1/2 lg:w-[30%]  w-full grid grid-cols-1 justify-items-center gap-2">
            <Button
              onClick={() => navigate('/')}
              className="w-full flex-center items-center gap-3 bg-blackTone text-white"
            >
              <Home className="w-4 h-4 " />
              Kembali ke Menu Awal
            </Button>
          </div>
        ) : null}
        {/* 
        <div className="md:w-1/2 lg:w-[30%]  w-full grid grid-cols-1 justify-items-center gap-2">
          <Button variant={'active'} className="w-full flex-center gap-3" onClick={() => setIsOpen(true)}>
            <Save className="w-4 h-4 " />
            Simpan Penilaian
          </Button>
        </div> */}
      </div>

      {isOpen && <DialogPenilaian />}
    </section>
  )
}

export default ClientTiket
