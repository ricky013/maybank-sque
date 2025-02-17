import LAYANAN_SERVICE from '@services/layanan.service'
import { useQuery } from '@tanstack/react-query'

export const useGetLayanan = (navigate: any) => {
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
