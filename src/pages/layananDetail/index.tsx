import Header from '@/components/client-panel/Header'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import SkeletonCard from '@/components/global/atoms/SkeletonCard'
import EmptyData from '@/components/global/atoms/EmptyData'
import { useEffect } from 'react'
import { useGetAllJenisTransaksiByLayanan } from '@features/jenisTransaksi.feature'
import CardJenisTransaksi from '@/components/client-panel/CardJenisTransaksi'

const LayananDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useGetAllJenisTransaksiByLayanan(navigate, id)

  useEffect(() => {
    if (isError) {
      toast.error(error?.message)
    }
  }, [isError])

  return (
    <>
      <section className="w-full min-h-screen bg-[#F4F5FE]">
        <Header />
        <div className="md:pt-24 pt-24 w-[90%] mx-auto">
          <h2 className="font-medium text-left text-xl  md:text-2xl">Jenis Transaksi</h2>
          {/* <p className="sm:text-base text-sm text-center">
            {data?.alamat} {data?.kota?.name} {data?.kota?.provinsi?.name}
          </p> */}
          {isLoading && <SkeletonCard type="card" count={2} />}

          {data?.data?.length > 0 ? <CardJenisTransaksi data={data?.data} /> : <EmptyData />}
        </div>
      </section>
      <Outlet />
    </>
  )
}

export default LayananDetail
