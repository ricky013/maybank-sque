import * as yup from 'yup'

export const formClientBooking = {
  bookingDate: '',
  jT: ''
}

export const schemaClientBooking = yup.object().shape({
  bookingDate: yup.string().required('Tanggal Booking is required')
})
