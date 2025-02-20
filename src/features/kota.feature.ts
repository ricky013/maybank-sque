import KOTA_SERVICE from '@services/kota.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllKotaByprovinsi = (navigate: any, provinsiId: string | undefined) => {
  return useQuery({
    queryKey: ['kota'],
    queryFn: async () => {
      if (!provinsiId) throw new Error('ID is required to fetch data')
      const response = await KOTA_SERVICE.getAllKotaByProvinsi(provinsiId)

      if (response.success === false) {
        throw new Error(response.message)
      }

      return {
        data: response.data,
        message: response.message,
        pagination: response.meta
      }
    },
    enabled: false,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}
