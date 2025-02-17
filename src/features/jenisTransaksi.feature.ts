import JENSI_TRANSAKSI_SERVICE from '@services/jenisTransaksi.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllJenisTransaksiByLayanan = (navigate: any, layananId: string | undefined) => {
  return useQuery({
    queryKey: ['jenisTransaksi'],
    queryFn: async () => {
      if (!layananId) throw new Error('ID is required to fetch data')
      const response = await JENSI_TRANSAKSI_SERVICE.getJenisTransaksiByLayananId(layananId)

      if (response.success === false) {
        throw new Error(response.message)
      }

      return {
        data: response.data,
        message: response.message,
        pagination: response.meta
      }
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}
