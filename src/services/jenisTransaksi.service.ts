import endpoint from './api/endpoint'
import { GET } from './api/method'

const getJenisTransaksiByLayananId = (id: string) => GET(`${endpoint.jenisTransaksi}/layanan/${id}`)

const JENSI_TRANSAKSI_SERVICE = {
  getJenisTransaksiByLayananId
}

export default JENSI_TRANSAKSI_SERVICE
