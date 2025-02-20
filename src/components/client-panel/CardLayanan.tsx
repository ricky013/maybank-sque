import asetLogoTeller from '@assets/client/images/logo-teller.png'
import asetLogoCustomerService from '@assets/client/images/logo-cutomer-service.png'
import { Link } from 'react-router-dom'

const CardLayanan = ({ data, cabangId }: { data: any; cabangId: string }) => {
  return (
    <div className="w-full grid grid-cols-1 md:gap-5 gap-3 md:grid-cols-2">
      {data?.map((item: any, index: number) => {
        return (
          <Link
            to={`/detail/layanan/${cabangId}/${item?.id}`}
            key={index}
            className="grid grid-cols-3 overflow-hidden h-[136px] sm:h-[146px] bg-white shadow-2xl rounded-2xl"
          >
            <div className="flex-center flex-col gap-3 p-2 bg-orangeTone text-primary-foreground">
              {item?.teks?.toUpperCase() === 'TELLER' ? (
                <img src={asetLogoTeller} alt="logo teller" className="object-cover object-center" />
              ) : (
                <img src={asetLogoCustomerService} alt="logo teller" className="object-cover object-center" />
              )}
              <h4 className="font-semibold text-sm text-center sm:text-2xl line-clamp-2 ">
                {item?.teks.toUpperCase()}
              </h4>
            </div>
            <div className="items-center justify-center flex flex-col p-2 gap-3 border-r-2 border-yellowTone">
              <h4 className="font-medium line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                Menunggu
              </h4>
              <span className="sm:text-4xl text-2xl font-medium text-yellowTone">25</span>
              <p className="font-normal line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">Antrian</p>
            </div>
            <div className="items-center justify-center flex flex-col p-2 gap-3 ">
              <h4 className="font-medium line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                Antrian Terakhir
              </h4>
              <span className="sm:text-4xl text-2xl font-medium text-yellowTone">A2005</span>
              <p className="font-normal line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                Sisa kouta : 22
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CardLayanan
