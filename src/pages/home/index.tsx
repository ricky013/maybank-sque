import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import asetLogoBNI from '@assets/client/images/logo-bni.svg'

const Home = () => {
  return (
    <section className="w-screen h-screen flex-center  overflow-hidden z-0 bg-[url('/src/assets/client/images/bg-gedung.jpeg')] top-0 left-0 bottom-0 right-0 relative bg-cover bg-center">
      <div className="relative top-0 left-0 bottom-0 right-0 bg-[url('/src/assets/client/images/bg-background.png')] z-10 bg-cover sm:bg-contain bg-center w-full h-full"></div>

      <div className="w-full h-full flex-center absolute z-20 flex-col flex gap-10">
        <div className="flex-center w-full">
          <img src={asetLogoBNI} className="object-cover object-center" />
        </div>
        <div className="flex flex-col gap-1 sm:gap-3 flex-center">
          <h1 className="sm:text-3xl text-base tracking-tight uppercase text-secondary-foreground font-semibold">
            Selamat Datang di Antrian Online
          </h1>
          <h2 className="sm:text-3xl text-base text-primary font-bold">BANK BNI</h2>
        </div>
        <p className="text-center text-xs sm:text-base text-secondary-foreground font-normal px-5">
          Silahkan tekan lanjut untuk melihat daftar cabang yang tersedia untuk Antrian Online kami.
        </p>

        <Link to="/domisili">
          <Button variant={'active'} className="px-20 py-5">
            Lihat Daftar Cabang
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Home
