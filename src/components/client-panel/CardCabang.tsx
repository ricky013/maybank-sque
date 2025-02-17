import asetLogoCabang from '@assets/client/images/logo-cabang.svg'
import asetMotifHeaderCardCabang from '@assets/client/images/motif-header-card-cabang.svg'
import { Link } from 'react-router-dom'

const CardCabang = ({ data }: { data: any }) => {
  return (
    <>
      <div className="w-full grid mt-5 grid-cols-1 md:gap-5 gap-3 md:grid-cols-2 wrapper-cabang p-2 sm:p-5 border rounded-2xl ">
        {data?.map((item: any, index: number) => {
          return (
            <Link
              to={`/layanan/${item.id}`}
              key={index}
              className="w-full cursor-pointer relative flex flex-col z-10 bg-transparent h-[150px] sm:h-[159px] overflow-hidden  rounded-2xl shadow-lg "
            >
              <div className="w-full flex justify-between h-[130px] sm:h-[140px] overflow-hidden ">
                <div className="w-1/2 relative h-full flex flex-col justify-end p-5 rounded-l-2xl bg-primary">
                  <img
                    src={asetMotifHeaderCardCabang}
                    alt="aset motif header card cabang"
                    className="absolute w-[80%] md:w-[50%] top-0 left-0 "
                  />
                  <img src={asetLogoCabang} alt="aset logo cabang" className="absolute top-7 md:top-10 left-5 w-7" />
                  <h4 className=" text-primary-foreground line-clamp-2 font-medium">{item?.name}</h4>
                </div>
                <div className="w-1/2  bg-primary-foreground p-2 rounded-r-2xl ">
                  <div className="w-full h-full  overflow-hidden">
                    <h3 className="font-medium text-center text-primary  text-sm sm:text-lg mb-2">Sisa Antrian</h3>
                    <div className="w-full grid  grid-cols-2  h-full ">
                      <div className="items-center justify-start flex flex-col  gap-3 border-r sm:border-r-2  border-primary">
                        <h4 className="font-medium line-clamp-2 text-wrap text-center text-xs sm:text-base leading-4">
                          Teller
                        </h4>
                        <span className="sm:text-4xl text-2xl font-medium text-secondary">25</span>
                      </div>
                      <div className="items-center justify-start flex flex-col gap-3">
                        <h4 className="font-medium line-clamp-2 text-xs sm:text-base sm:line-clamp-2 leading-4 text-wrap text-center">
                          Customer Service
                        </h4>
                        <span className="sm:text-4xl text-2xl font-medium text-secondary">25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full rounded-2xl h-full absolute -z-10 bg-secondary"></div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default CardCabang
