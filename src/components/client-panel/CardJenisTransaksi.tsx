import asetLogoTeller from '@assets/client/images/logo-teller.png'
import asetLogoCustomerService from '@assets/client/images/logo-cutomer-service.png'

interface ActionProps {
  e: (event: React.MouseEvent, teks: any) => void
}

const CardJenisTransaksi = ({ data, action }: { data: any; action: ActionProps }) => {
  return (
    <div className="w-full grid grid-cols-1 md:gap-2 gap-3 md:grid-cols-2">
      {data?.map((item: any, index: number) => {
        return (
          <button
            key={index}
            id={item.id}
            onClick={(e) => action.e(e, item)}
            className="grid grid-cols-1 overflow-hidden sm:h-[56px] bg-white shadow-2xl rounded-2xl"
          >
            <div className="gap-3 p-2 bg-orangeTone text-primary-foreground flex items-center">
              {item?.teks?.toUpperCase() === 'TELLER' ? (
                <img src={asetLogoTeller} alt="logo teller" className="object-cover object-center" />
              ) : (
                <img src={asetLogoCustomerService} alt="logo teller" className="object-cover object-center" />
              )}
              <h4 className="font-semibold text-sm text-center sm:text-2xl line-clamp-2 ">
                {item?.teks.toUpperCase()}
              </h4>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default CardJenisTransaksi
