import CABANG_SERVICE from '@services/cabang.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllCabangByKotaId = (navigate: any, kotaId: string | undefined) => {
  return useQuery({
    queryKey: ['kota'],
    queryFn: async () => {
      if (!kotaId) throw new Error('ID is required to fetch data')
      const response = await CABANG_SERVICE.getAllCabangByKotaId(kotaId)

      if (response.success === false) {
        throw new Error(response.message)
      }

      // return {
      //   data: response.data,
      //   message: response.message,
      //   pagination: response.meta
      // }
      return response.content
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  })
}

export const useGetCabangById = (navigate: any, id: string | undefined) => {
  return useQuery({
    queryKey: ['cabangId', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required to fetch data')
      const response = await CABANG_SERVICE.getCabangById(id)

      if (response.statusCode === 400) {
        throw new Error(response.message)
      }

      return response.data
    }
  })
}
