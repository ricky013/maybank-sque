import endpoint from './api/endpoint'
import { GET } from './api/method'

const getAllLayanan = () => GET(`${endpoint.layanan}`)

const LAYANAN_SERVICE = {
  getAllLayanan
}

export default LAYANAN_SERVICE
