import Header from '@/components/client-panel/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import SkeletonCard from '@/components/global/atoms/SkeletonCard'
import EmptyData from '@/components/global/atoms/EmptyData'
import { useGetLayanan } from '@features/layanan.feature'
import { useGetCabangById } from '@features/cabang.feature'
import CardLayanan from '@/components/client-panel/CardLayanan'
import { useEffect } from 'react'

const Layanan = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isError, error } = useGetCabangById(navigate, id)
  const {
    data: dataLayanan,
    isLoading: isLoadingLayanan,
    isError: isErrorLayanan,
    error: errorLayanan
  } = useGetLayanan(navigate)

  useEffect(() => {
    if (isError || isErrorLayanan) {
      toast.error(error?.message || errorLayanan?.message)
    }
  }, [isError, isErrorLayanan])

  return (
    <section className="w-full min-h-screen bg-[#F4F5FE]">
      <Header />
      <div className="md:pt-24 pt-24 w-[90%] mx-auto">
        <div className="flex-center flex-col">
          <h2 className="font-medium text-xl md:text-2xl">{data?.name}</h2>
          <p className="sm:text-base text-sm text-center">
            {data?.alamat} {data?.kota?.name} {data?.kota?.provinsi?.name}
          </p>
        </div>
        {isLoadingLayanan && <SkeletonCard type="card" count={2} />}

        {dataLayanan?.data?.length > 0 ? <CardLayanan data={dataLayanan?.data} /> : <EmptyData />}
      </div>
    </section>
  )
}

export default Layanan
