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
    <section className="w-full min-h-screen bg-responsive">
      <Header />
      <div className="w-[90%] mx-auto grid h-screen grid-rows-10 gap-3">
        <div className="grid row-start-2">
          <h2 className="font-medium text-xl md:text-2xl text-center">{dataCabang && JSON.parse(dataCabang).nama}</h2>
          <p className="text-xs lg:text-bsae text-center">{dataCabang && JSON.parse(dataCabang).alamat}</p>
          <h2 className="font-medium text-left text-xl  md:text-2xl flex flex-start">Pilih Layanan :</h2>
        </div>
        <div className="overflow-auto row-start-3 row-end-10 wrapper-cabang rounded-3xl p-3">
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
