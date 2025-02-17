import endpoint from './api/endpoint'
import { GET } from './api/method'

const getAllProvinsi = () => GET(`${endpoint.provinsi}`)

const PROVINSI_SERVICE = {
  getAllProvinsi
}

export default PROVINSI_SERVICE
