import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import asetLogo from '@assets/client/images/logo-maybank.svg'
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
  const { data, isLoading, isError, error } = useGetProvinsi()
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
    if (domisili.provinsiId != '') {
      setDomisili((prev) => ({ ...prev, kotaId: '' }))
      refetchKota()
    }
  }, [domisili.provinsiId, refetchKota])

  if (isError || isErrorKota) {
    toast.error(error?.message || errorKota?.message)
  }

  return (
    <section className="w-screen h-screen flex-center  overflow-hidden z-0 bg-responsive">
      <div className="w-full h-full  flex-center absolute z-20 flex-col flex gap-20 ">
        <div className="flex-center w-full">
          <img src={asetLogo} className="object-cover object-center w-1/2 lg:w-1/3" />
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
                      {item.teks}
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
                      {item.teks}
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
            className="w-1/2 mx-auto flex-center bg-blackTone"
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
