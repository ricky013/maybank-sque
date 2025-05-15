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
    .matches(/^0\d*$/, 'Nomor telepon harus angka dimulai dengan 0')
    .min(10, 'Nomor telepon terlalu pendek')
    .max(15, 'Nomor telepon terlalu panjang')
})
