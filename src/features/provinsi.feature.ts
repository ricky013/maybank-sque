import PROVINSI_SERVICE from '@services/provinsi.service'
import { useQuery } from '@tanstack/react-query'

export const useGetProvinsi = (navigate: any) => {
  return useQuery({
    queryKey: ['provinsi'],
    queryFn: async () => {
      const response = await PROVINSI_SERVICE.getAllProvinsi()

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
