import { Button } from '@/components/ui/button'
import asetLogoBNI from '@assets/client/images/logo-bni.svg'
import qrCodeTiket from '@assets/client/images/tiket-qrCode.png'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, ClockIcon, Copy, Download, Save, Share2 } from 'lucide-react'
import Header from '@/components/client-panel/Header'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import asetMotifHeaderCardCabang from '@assets/client/images/motif-header-card-cabang.svg'
import iconPenilaian from '@assets/client/icons/icon-penilaian.png'
import { useState } from 'react'
// import ReactStars from 'react-rating-stars-component'

const ClientTiket = () => {
  const [isOpen, setIsOpen] = useState(false)
  // useEffect(() => {
  //   if (isError) {
  //     toast.custom((t) => <ToastSonnerError message={error.message} t={t} toast={toast} />, { duration: Infinity })
  //   }
  // }, [isError, error])

  const DialogPenilaian = () => {
    return (
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="w-[90%]  rounded-2xl bg-[#0A3848] border-primary">
          <DialogHeader>
            <img src={asetMotifHeaderCardCabang} className="absolute left-0 top-0 -z-10" />
          </DialogHeader>

          <div className="flex-center flex-col gap-3 text-white">
            <div className="flex-center">
              <img src={iconPenilaian} alt="icon penilaian" className="object-cover object-center" />
            </div>
            <p className="font-medium">Terimakasih Atas Penilaian Anda</p>
            <DialogFooter>
              <Button className="bg-secondary text-white px-7" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <section className="w-full overflow-hidden h-screen bg-[#F4F5FE]">
      <Header displayLogo={false} />
      <div className="w-full h-full flex-center flex-col gap-5">
        <div className="md:w-[30%]  z-10 relative w-[90%] p-5  shadow-ticket overflow-hidden">
          <span className="inline-block w-[48px] h-[48px]  shadow-ticket rounded-full absolute top-[55%] -left-[7%] "></span>
          <span className="inline-block w-[48px] h-[48px]  shadow-ticket rounded-full absolute top-[55%] -right-[7%] "></span>
          <header className="flex-center flex-col gap-1">
            <img src={asetLogoBNI} alt="motif header" className="object-cover  object-center w-28 h-auto" />
            <h1 className="font-medium text-xl md:text-2xl">Kantor Pusat</h1>
            <p className="font-normal text-xs md:text-base text-center">
              Jl. Jenderal Sudirman No.10 Kav. 1, RT.10/RW.11, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat,
              Daerah Khusus Ibukota Jakarta 10220
            </p>
            <h2 className="font-medium text-xl md:text-2xl">CHECK-IN</h2>
          </header>

          <div className="w-[90%] mx-auto content-center flex-center flex-col gap-2">
            <Separator className="bg-primary my-3 h-[1px]" />
            <div className="grid grid-cols-2 w-full gap-5 justify-items-center">
              <div className="flex-center flex-col gap-1">
                <h3 className="text-xs md:text-base font-normal">Nomor Antrian Anda</h3>
                <span className="text-lg md:text-xl font-medium text-primary">A007</span>
              </div>
              <div className="flex-center flex-col gap-1">
                <h3 className=" text-xs md:text-base font-normal">Jenis Transaksi</h3>
                <span className="text-lg md:text-xl font-medium text-primary">TELLER</span>
              </div>
              <div className="flex-center flex-col gap-1">
                <img src={qrCodeTiket} alt="motif header" className="object-cover  object-center w-28 h-auto" />
              </div>
              <div className="flex justify-start items-center flex-col gap-1">
                <h3 className="text-xs md:text-base font-normal">Kode Booking Anda</h3>
                <span className="text-lg md:text-xl font-medium text-primary">123456</span>
              </div>
            </div>

            <div className="flex flex-col my-3 md:my-5 w-full">
              <Separator className="bg-primary my-5 h-[1px]" />
              <p className="text-xs sm:text-sm font-medium text-primary text-center">
                Tanggal dicetak : Sabtu, 01 Januari 2022
              </p>
            </div>

            <div className="grid  grid-cols-2 gap-5 w-full justify-items-center">
              <div className="flex items-start justify-start gap-2">
                <CalendarIcon className="w-4 h-4 mt-1" />
                <div className="flex flex-col text-xs sm:text-sm">
                  <p>Tanggal Booking : </p>
                  <span className="font-medium text-primary">Senin, 03 Januari 2022</span>
                </div>
              </div>

              <div className="flex items-start justify-start gap-2">
                <ClockIcon className="w-4 h-4 mt-1" />
                <div className="flex flex-col text-xs sm:text-sm">
                  <p>Jam Booking : </p>
                  <span className="font-medium text-primary">16:41:25</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <ReactStars count={5} onChange={(newRating: any) => console.warn(newRating)} size={24} activeColor="#ffd700" /> */}

        <div className="md:w-[30%] w-[90%] grid grid-cols-3 justify-items-center gap-2">
          <Button variant={'danger'} className="w-full flex-center gap-3">
            <Download className="w-4 h-4 " />
            Ubah
          </Button>
          <Button variant={'danger'} className="w-full flex-center gap-3">
            <Copy className="w-4 h-4 " />
            Salin
          </Button>
          <Button variant={'active'} className="w-full flex-center gap-3">
            <Share2 className="w-4 h-4 " />
            Bagikan
          </Button>
        </div>

        <div className="md:w-[30%] w-[90%] grid grid-cols-1 justify-items-center gap-2">
          <Button variant={'active'} className="w-full flex-center gap-3" onClick={() => setIsOpen(true)}>
            <Save className="w-4 h-4 " />
            Simpan Penilaian
          </Button>
        </div>
      </div>

      {isOpen && <DialogPenilaian />}
    </section>
  )
}

export default ClientTiket
