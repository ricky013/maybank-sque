import LAYANAN_SERVICE from '@services/layanan.service'
import { useQuery } from '@tanstack/react-query'

export const useGetLayanan = () => {
  return useQuery({
    queryKey: ['layanan'],
    queryFn: async () => {
      const response = await LAYANAN_SERVICE.getAllLayanan()

      if (response.statusCode === 400) {
        throw new Error(response.message)
      }

      return response
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}

export const useGetLayananByCabangId = (navigate: any, cabangId: string | undefined) => {
  return useQuery({
    queryKey: ['cabangId', cabangId],
    queryFn: async () => {
      if (!cabangId) throw new Error('ID is required to fetch data')
      const response = await LAYANAN_SERVICE.getLayananByCabangId(cabangId)

      if (response.statusCode === 400) {
        throw new Error(response.message)
      }

      return response
    }
  })
}
