import endpoint from './api/endpoint'
import { GET } from './api/method'

const getAllKota = () => GET(`${endpoint.kota}`)
const getAllKotaByProvinsi = (id: string) => GET(`${endpoint.kota}?provinsiId=${id}`)

const KOTA_SERVICE = {
  getAllKota,
  getAllKotaByProvinsi
}

export default KOTA_SERVICE
