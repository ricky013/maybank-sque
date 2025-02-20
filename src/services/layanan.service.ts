import endpoint from './api/endpoint'
import { GET } from './api/method'

const getAllLayanan = () => GET(`${endpoint.layanan}`)
const getLayananByCabangId = (cabangId: string) => GET(`${endpoint.layanan}?cabangId=${cabangId}`)

const LAYANAN_SERVICE = {
  getAllLayanan,
  getLayananByCabangId
}

export default LAYANAN_SERVICE
