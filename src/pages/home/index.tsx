import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import asetLogo from '@assets/client/images/logo-maybank.svg'

const Home = () => {
  return (
    <section className="w-screen h-screen flex-center overflow-hidden relative bg-responsive">
      <div className="w-full h-full flex-center absolute z-20 flex-col flex gap-10">
        <div className="flex-center w-full">
          <img src={asetLogo} className="object-cover object-center w-1/2 lg:w-1/3" />
        </div>
        <div className="grid gap-1 sm:gap-3 text-center">
          <h1 className="text-2xl tracking-tight uppercase text-secondary-foreground font-semibold">
            Selamat Datang di Antrian
          </h1>
          <h2 className="text-2xl font-bold">ONLINE MAYBANK</h2>
        </div>
        <p className="text-center text-lg sm:text-base text-secondary-foreground font-normal px-5">
          Silahkan tekan lanjut untuk melihat daftar cabang yang tersedia untuk Antrian Online kami.
        </p>

        <Link to="/domisili">
          <Button variant={'active'} className="px-20 py-5 bg-blackTone">
            Lihat Daftar Cabang
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Home
