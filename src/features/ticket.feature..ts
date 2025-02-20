import TICKET_SERVICE from '@services/ticket.service'
import { useQuery } from '@tanstack/react-query'

export const useGetTicket = (navigate: any, kodeBooking: string, tanggal: string) => {
  return useQuery({
    queryKey: ['kodeBooking', kodeBooking],
    queryFn: async () => {
      if (!kodeBooking) throw new Error('Kode booking is required to fetch data')
      const response = await TICKET_SERVICE.getTicket(kodeBooking, tanggal)

      if (response.success === false) {
        throw new Error(response.message)
      }

      // return {
      //   data: response.data,
      //   message: response.message,
      //   pagination: response.meta
      // }
      return response.data
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}

export const useSendSurvey = (
  navigate: any,
  kodeBooking: string,
  tanggal: string,
  rating: string,
  catatanSurvei: string
) => {
  return useQuery({
    queryKey: ['sendSurvey', kodeBooking, tanggal, rating, catatanSurvei], // Perbarui queryKey
    queryFn: async () => {
      if (!kodeBooking) throw new Error('Kode booking is required to fetch data')
      const response = await TICKET_SERVICE.sendSurvei(kodeBooking, tanggal, rating, catatanSurvei)

      if (response.success === false) {
        throw new Error(response.message)
      }

      return response.data
    },
    enabled: false,
    staleTime: 0, // **Agar selalu dianggap data lama**
    cacheTime: 0, // **Hapus cache setelah digunakan**
    refetchOnWindowFocus: false
  })
}
