import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

export const formatTanggal = (isoDateString: string): string => {
  const hariDalamMinggu = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const bulanDalamTahun = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  const date = new Date(isoDateString) // Buat objek Date dari string ISO (UTC - jam database UTC)
  const hari = hariDalamMinggu[date.getUTCDay()] // Dapatkan nama hari dalam minggu
  const tanggal = date.getUTCDate() // Dapatkan tanggal (1-31)
  const bulan = bulanDalamTahun[date.getUTCMonth()] // Dapatkan nama bulan
  const tahun = date.getUTCFullYear() // Dapatkan tahun

  // Mengembalikan string dalam format "Selasa, 21 Januari 2024"
  return `${hari}, ${tanggal} ${bulan} ${tahun}`
}

export const formatCapitalize = (kalimat: string): string => {
  if (!kalimat) return ''
  return kalimat.charAt(0).toUpperCase() + kalimat.slice(1).toLowerCase()
}

export const formattedTanggalAwal = (dateRange: DateRange | undefined) => {
  return dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : ''
}
export const formattedTanggalAkhir = (dateRange: DateRange | undefined) => {
  return dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : ''
}

export const formatDateToYYYYMMDD = (date: any) => {
  const year = date.getFullYear() // Mendapatkan tahun (YYYY)
  const month = String(date.getMonth() + 1).padStart(2, '0') // Mendapatkan bulan (MM), ditambah 1 karena bulan dimulai dari 0
  const day = String(date.getDate()).padStart(2, '0') // Mendapatkan tanggal (DD)

  return `${year}-${month}-${day}` // Menggabungkan menjadi YYYY-MM-DD
}
