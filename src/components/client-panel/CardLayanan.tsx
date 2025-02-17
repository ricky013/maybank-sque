import asetLogoTeller from '@assets/client/images/logo-teller.png'
import asetLogoCustomerService from '@assets/client/images/logo-cutomer-service.png'
import { Link } from 'react-router-dom'

const CardLayanan = ({ data }: { data: any }) => {
  return (
    <div className="w-full grid mt-5 grid-cols-1 md:gap-5 gap-3 md:grid-cols-2 wrapper-cabang p-2 sm:p-5 border rounded-2xl">
      {data?.map((item: any, index: number) => {
        return (
          <Link
            to={`/detail/layanan/${item?.id}`}
            key={index}
            className="grid grid-cols-3 overflow-hidden h-[136px] sm:h-[146px] bg-white shadow-2xl rounded-2xl"
          >
            <div className="flex-center flex-col gap-3 p-2 bg-primary text-primary-foreground">
              {item?.nama?.toUpperCase() === 'TELLER' ? (
                <img src={asetLogoTeller} alt="logo teller" className="object-cover object-center" />
              ) : (
                <img src={asetLogoCustomerService} alt="logo teller" className="object-cover object-center" />
              )}
              <h4 className="font-semibold text-sm text-center sm:text-2xl line-clamp-2">{item?.nama}</h4>
            </div>
            <div className="items-center justify-center flex flex-col p-2 gap-3 ">
              <h4 className="font-medium line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                Menunggu
              </h4>
              <span className="sm:text-4xl text-2xl font-medium text-secondary">25</span>
              <p className="font-normal line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">Antrian</p>
            </div>
            <div className="items-center justify-center flex flex-col p-2 gap-3 ">
              <h4 className="font-medium line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                Antrian Terakhir
              </h4>
              <span className="sm:text-4xl text-2xl font-medium text-secondary">25</span>
              <p className="font-normal line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                sisa kouta : 22
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CardLayanan
