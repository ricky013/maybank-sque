import endpoint from './api/endpoint'
import { GET, POST } from './api/method'

const getTicket = (kodeBooking: string, tanggal: string) =>
  GET(`${endpoint.eTicket}?kodeBooking=${kodeBooking}&tanggal=${tanggal}`)
const sendSurvei = (kodeBooking: string, tanggal: string, rating: string, catatanSurvei: string) =>
  POST(`${endpoint.survei}`, {
    tanggal: tanggal,
    kodeBooking: kodeBooking,
    surveiId: rating,
    catatanSurvei: catatanSurvei
  })

const PROVINSI_SERVICE = {
  getTicket,
  sendSurvei
}

export default PROVINSI_SERVICE
