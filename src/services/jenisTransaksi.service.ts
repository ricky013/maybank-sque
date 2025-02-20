import endpoint from './api/endpoint'
import { GET, POST } from './api/method'

const getJenisTransaksiByLayananId = (id: string) => GET(`${endpoint.jenisTransaksi}/layanan/${id}`)
const getJenisTransaksiByCabangAndLayananId = (cabangId: string, layananId: string) =>
  GET(`${endpoint.jenisTransaksi}?cabangId=${cabangId}&layananId=${layananId}`)
const getTanggalBookingByCabangIdAndLayananId = (cabangId: string, layananId: string) =>
  GET(`${endpoint.tanggal}?cabangId=${cabangId}&layananId=${layananId}`)
const getCodeBooking = (dataBody: object) => POST(`${endpoint.booking}`, dataBody)

const JENSI_TRANSAKSI_SERVICE = {
  getJenisTransaksiByLayananId,
  getJenisTransaksiByCabangAndLayananId,
  getTanggalBookingByCabangIdAndLayananId,
  getCodeBooking
}

export default JENSI_TRANSAKSI_SERVICE
