import Header from '@/components/client-panel/Header'
import InputSearch from '@/components/global/moleculs/InputSearch'
import { RefreshCcw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllCabangByKotaId } from '@features/cabang.feature'
import { toast } from 'sonner'
import CardCabang from '@/components/client-panel/CardCabang'
import SkeletonCard from '@/components/global/atoms/SkeletonCard'
import EmptyData from '@/components/global/atoms/EmptyData'

const Cabang = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useGetAllCabangByKotaId(navigate, id)
  if (isError) {
    toast.error(error.message)
  }

  return (
    <section className="w-full min-h-screen bg-[#F4F5FE]">
      <Header />
      <div className="md:pt-24 pt-24 w-[90%] mx-auto">
        <div className="w-full md:grid md:grid-cols-2 flex justify-between gap-3">
          <h2 className="font-medium text-sm md:text-2xl">Daftar Cabang</h2>
          <div className="flex-center flex gap-3">
            <InputSearch search={''} placeholder="Cari" handleSearchChange={(e) => console.warn(e)} />
            <div className="cursor-pointer flex-center">
              <RefreshCcw className=" h-4 w-4" />
            </div>
          </div>
        </div>
        {isLoading && <SkeletonCard type="card" count={2} />}

        {data?.data?.length > 0 ? <CardCabang data={data?.data} /> : <EmptyData />}
      </div>
    </section>
  )
}

export default Cabang
