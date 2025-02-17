import { Link } from 'react-router-dom'

const CardJenisTransaksi = ({ data }: { data: any }) => {
  return (
    <div className="w-full grid mt-5 grid-cols-1 md:gap-2 gap-3 md:grid-cols-2 wrapper-cabang p-2 sm:p-5 border rounded-2xl">
      {data?.map((item: any, index: number) => {
        return (
          <Link
            to={`/detail/layanan/booking/${item?.id}`}
            key={index}
            className="grid grid-cols-1 overflow-hidden h-[36px] sm:h-[56px] bg-white shadow-2xl rounded-2xl"
          >
            <div className="flex-center flex-col gap-3 p-2 bg-primary text-primary-foreground">
              <h4 className="font-semibold text-sm text-center sm:text-xl line-clamp-2">Nama : {item?.nama} </h4>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CardJenisTransaksi
