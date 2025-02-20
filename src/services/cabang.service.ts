import endpoint from './api/endpoint'
import { GET } from './api/method'

const getAllCabangByKotaId = (id: string) => GET(`${endpoint.cabang}/kota?kotaId=${id}`)
const getCabangById = (id: string) => GET(endpoint.cabang, id)

const CABANG_SERVICE = {
  getCabangById,
  getAllCabangByKotaId
}

export default CABANG_SERVICE
