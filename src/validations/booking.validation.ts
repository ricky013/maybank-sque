import * as yup from 'yup'

export const formClientBooking = {
  bookingDate: '',
  jtSelected: '',
  telepon: ''
}

export const schemaClientBooking = yup.object().shape({
  jtSelected: yup.string().required(),
  bookingDate: yup.string().required('Tanggal Booking harus diisi'),
  telepon: yup
    .string()
    .required('Nomor telepon harus diisi')
    .matches(/^08\d{8,11}$/, 'Nomor harus dimulai dengan 08 dan panjang antara 10–13 angka')
})
