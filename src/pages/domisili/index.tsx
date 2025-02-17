import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import asetLogoBNI from '@assets/client/images/logo-bni.svg'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetProvinsi } from '@features/provinsi.feature'
import { useEffect, useState } from 'react'
import { useGetAllKotaByprovinsi } from '@features/kota.feature'
import { toast } from 'sonner'

const Domisili = () => {
  const navigate = useNavigate()
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const [domisili, setDomisili] = useState({
    provinsiId: '',
    kotaId: ''
  })
  const { data, isLoading, isError, error } = useGetProvinsi(navigate)
  const {
    data: dataKota,
    isLoading: isLoadingKota,
    isError: isErrorKota,
    error: errorKota,
    refetch: refetchKota
  } = useGetAllKotaByprovinsi(navigate, domisili.provinsiId)

  useEffect(() => {
    setIsDisabledButton(!(domisili.provinsiId && domisili.kotaId))
  }, [domisili])

  useEffect(() => {
    if (domisili.provinsiId) {
      setDomisili((prev) => ({ ...prev, kotaId: '' }))
      refetchKota()
    }
  }, [domisili.provinsiId, refetchKota])

  if (isError || isErrorKota) {
    toast.error(error?.message || errorKota?.message)
  }

  return (
    <section className="w-screen h-screen flex-center  overflow-hidden z-0 bg-[url('/src/assets/client/images/bg-gedung.jpeg')] top-0 left-0 bottom-0 right-0 relative bg-cover bg-center">
      <div className="relative top-0 left-0 bottom-0 right-0 bg-[url('/src/assets/client/images/bg-background.png')] z-10 bg-cover sm:bg-contain bg-center w-full h-full"></div>

      <div className="w-full h-full  flex-center absolute z-20 flex-col flex gap-20 ">
        <div className="flex-center w-full ">
          <img src={asetLogoBNI} className="object-cover object-center" />
        </div>

        <div className="wrapper-domisili rounded-md md:w-1/2 w-[90%] mx-auto md:p-10 p-5 flex flex-col gap-5">
          <Select onValueChange={(value) => setDomisili({ ...domisili, provinsiId: value, kotaId: '' })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isLoading && <SelectItem value="0">Loading...</SelectItem>}
                {data?.data?.length > 0 && isLoading === false ? (
                  data?.data?.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="0">Data Kosong</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setDomisili({ ...domisili, kotaId: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kota" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isLoadingKota && <SelectItem value="0">Loading...</SelectItem>}
                {dataKota?.data?.length > 0 && isLoadingKota === false ? (
                  dataKota?.data?.map((item: any) => (
                    <SelectItem
                      key={item.id}
                      onClick={() => setDomisili({ ...domisili, kotaId: item.id })}
                      value={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="0">Data Kosong</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            disabled={isDisabledButton}
            variant={'active'}
            className="w-1/2 mx-auto flex-center"
            onClick={() => navigate(`/cabang/${domisili.kotaId}`)}
          >
            OK
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Domisili
