import CardLayanan from '@/components/client-panel/CardLayanan'
import Header from '@/components/client-panel/Header'
import EmptyData from '@/components/global/atoms/EmptyData'
import SkeletonCard from '@/components/global/atoms/SkeletonCard'
import { useGetLayananByCabangId } from '@features/layanan.feature'
import { useNavigate, useParams } from 'react-router-dom'

const Layanan = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dataCabang = localStorage.getItem('cabang')
  // const { data, isError, error } = useGetCabangById(navigate, id)
  const {
    data: dataLayanan,
    isLoading: isLoadingLayanan
    // isError: isErrorLayanan,
    // error: errorLayanan
  } = useGetLayananByCabangId(navigate, id)

  // useEffect(()=>{
  //   console.log(dataLayanan);

  // },[])
  // useEffect(() => {
  //   if (isError || isErrorLayanan) {
  //     toast.error(error?.message || errorLayanan?.message)
  //   }
  // }, [isError, isErrorLayanan])

  return (
    <section className="w-full min-h-screen bg-[url('/src/assets/client/images/sm-bg.svg')] lg:bg-[url('/src/assets/client/images/lg-bg.svg')] z-10 bg-cover  bg-center bg-no-repeat">
      <Header />
      <div className="md:pt-24 pt-24 w-[90%] mx-auto grid h-screen grid-rows-10">
        {/* <div className="flex-center flex-col">
          <h2 className="font-medium text-xl md:text-2xl">{data?.name}</h2>
          <p className="sm:text-base text-sm text-center">
            {data?.alamat} {data?.kota?.name} {data?.kota?.provinsi?.name}
          </p>
        </div> */}
        <div className="flex-center flex-col">
          <h2 className="font-medium text-xl md:text-2xl">{dataCabang && JSON.parse(dataCabang).nama}</h2>
          <p className="text-xs lg:text-bsae text-center">{dataCabang && JSON.parse(dataCabang).alamat}</p>
        </div>
        <div className="overflow-auto row-span-8 wrapper-cabang rounded-3xl p-3">
          {isLoadingLayanan ? (
            <SkeletonCard type="card" count={2} />
          ) : dataLayanan?.data?.length > 0 ? (
            <CardLayanan data={dataLayanan?.data} cabangId={String(id)} />
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
    </section>
  )
}

export default Layanan
