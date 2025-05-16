import CardCabang from '@/components/client-panel/CardCabang'
import EmptyData from '@/components/global/atoms/EmptyData'
import SkeletonCard from '@/components/global/atoms/SkeletonCard'
import InputSearch from '@/components/global/moleculs/InputSearch'
import { useGetAllCabangByKotaId } from '@features/cabang.feature'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Cabang = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filterText, setFilterText] = useState('')
  const [filteredCabang, setFilteredCabang] = useState([])

  const { data, isLoading, isError, error } = useGetAllCabangByKotaId(navigate, id)

  useEffect(() => {
    if (data) {
      setFilteredCabang(data)
    }
  }, [data])

  useEffect(() => {
    if (filterText) {
      const filteredItems = data?.filter((item: []) =>
        Object.values(item).some(
          (value) => typeof value === 'string' && (value as string).toLowerCase().includes(filterText.toLowerCase())
        )
      )
      return setFilteredCabang(filteredItems)
    }

    return setFilteredCabang(data)
  }, [filterText])

  if (isError) {
    toast.error(error.message)
  }

  return (
    <section className="flex flex-col gap-3 min-h-[80vh]">
      <div className="w-full md:grid md:grid-cols-2 flex justify-between gap-3 items-center">
        <h2 className="font-medium text-xs md:text-base lg:text-2xl">Daftar Cabang</h2>
        <div className="flex-center flex gap-3">
          <InputSearch
            search={filterText}
            placeholder="Cari"
            handleSearchChange={(e) => setFilterText(e.target.value)}
          />
          <div className="cursor-pointer flex-center">
            <RefreshCcw className=" h-4 w-4" onClick={() => setFilterText('')} />
          </div>
        </div>
      </div>
      <div className="overflow-auto wrapper-cabang rounded-3xl p-5 flex-grow">
        {isLoading ? (
          <SkeletonCard type="card" count={2} />
        ) : filteredCabang?.length > 0 ? (
          <CardCabang data={filteredCabang} />
        ) : (
          <EmptyData />
        )}
      </div>
    </section>
  )
}

export default Cabang
