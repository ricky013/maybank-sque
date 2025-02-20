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

export const useGetJenisTransaksiByCabangAndLayanan = (
  navigate: any,
  cabangId: string | undefined,
  layananId: string | undefined
) => {
  return useQuery({
    queryKey: ['layananId', layananId],
    queryFn: async () => {
      if (!cabangId || !layananId) throw new Error('ID is required to fetch data')
      const response = await JENSI_TRANSAKSI_SERVICE.getJenisTransaksiByCabangAndLayananId(cabangId, layananId)

      if (response.statusCode === 400) {
        throw new Error(response.message)
      }

      return response.data
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}

export const useGetTanggalBooking = (navigate: any, cabangId: string | undefined, layananId: string | undefined) => {
  return useQuery({
    queryKey: ['layananId', layananId],
    queryFn: async () => {
      if (!cabangId || !layananId) throw new Error('ID is required to fetch data')
      const response = await JENSI_TRANSAKSI_SERVICE.getTanggalBookingByCabangIdAndLayananId(cabangId, layananId)

      if (response.statusCode === 400) {
        throw new Error(response.message)
      }

      return response.data
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}

export const useGetCodeBooking = (navigate: any, dataBody: any) => {
  return useQuery({
    queryKey: ['dataBody', dataBody],
    queryFn: async () => {
      if (!dataBody || Object.keys(dataBody).length === 0) throw new Error('Databody is required to fetch data')
      const response = await JENSI_TRANSAKSI_SERVICE.getCodeBooking(dataBody)

      if (response.statusCode === 400) {
        throw new Error(response.message)
      }

      // Pastikan response.data ada
      if (!response.data) {
        throw new Error('No data returned from the server')
      }

      return response.data
    },
    enabled: false,
    placeholderData: [],
    refetchOnWindowFocus: false,
    retry: false
  })
}
