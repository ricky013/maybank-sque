import IconLocation from '@assets/client/icons/location.svg'
import IconMoving from '@assets/client/icons/moving.svg'
import { Link } from 'react-router-dom'

const CardCabang = ({ data }: { data: any }) => {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:gap-5 gap-3 md:grid-cols-2">
        {data?.map((item: any, index: number) => {
          return (
            <Link
              to={`/layanan/${item.id}`}
              key={index}
              className="w-full cursor-pointer relative flex flex-col z-10 h-[150px] sm:h-[159px] overflow-hidden rounded-2xl shadow-lg bg-[#BFBFBF]"
            >
              <div className="w-full flex justify-between h-[130px] sm:h-[140px] overflow-hidden ">
                <div className="w-1/2 relative h-full flex flex-col justify-end p-5 rounded-l-2xl bg-yellowTone">
                  <h4 className=" font-medium">{item?.nama}</h4>
                </div>
                <div className="w-1/2 bg-primary-foreground p-2 rounded-r-2xl">
                  <div className="w-full h-full  overflow-hidden">
                    <h3 className="font-medium text-center text-yellowTone text-sm sm:text-lg mb-2">Sisa Antrian</h3>
                    <div className="w-full grid grid-cols-2">
                      <div className="flex flex-col justify-between items-center h-full gap-3 border-r sm:border-r-2 border-primary">
                        <h4 className="font-medium line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                          TELLER
                        </h4>
                        <span className="text-3xl font-medium text-secondary">{item.statusLayanan[0].sisaAntrian}</span>
                      </div>
                      <div className="flex flex-col justify-between items-center h-full gap-3">
                        <h4 className="font-medium line-clamp-2 text-xs sm:text-base sm:line-clamp-2 leading-4 text-wrap text-center">
                          CUSTOMER SERVICE
                        </h4>
                        <span className="text-3xl font-medium text-secondary">{item.statusLayanan[1].sisaAntrian}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between p-2 items-center">
                <span className="flex items-center text-xs gap-2">
                  <img src={IconMoving} alt="moving" />
                  <strong>Jarak dari posisi anda :</strong>{' '}
                </span>
                <span className="flex items-center text-xs gap-2">
                  <img src={IconLocation} alt="location"></img> {item.jarak} km
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default CardCabang
