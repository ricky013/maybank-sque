// helpers/swalHelpers.ts
import swal from 'sweetalert'

interface IDeleteConfirmationOptions {
  title?: string
  text: string
  confirmButtonText?: string
  cancelButtonText?: string
  onDelete: () => any // Fungsi yang akan dipanggil untuk menghapus data
  onSuccess?: () => void // Callback jika penghapusan berhasil
  onError?: (error: any) => void // Callback jika terjadi error
}

interface IResponse {
  success: boolean
  message: string
}

interface IWarningConfirmationOptions {
  title?: string
  text: string
  confirmButtonText?: string
  onError?: (error: any) => void // Callback jika terjadi error
}

export const deleteConfirmation = async ({
  title = 'Konfirmasi Hapus',
  text,
  confirmButtonText = 'Ya, Hapus!',
  cancelButtonText = 'Batal',
  onDelete,
  onSuccess,
  onError
}: IDeleteConfirmationOptions) => {
  try {
    const willDelete = await swal({
      title,
      text,
      icon: 'warning',
      buttons: {
        cancel: {
          text: cancelButtonText,
          value: null,
          visible: true,
          className: 'swal-button--cancel'
        },
        confirm: {
          text: confirmButtonText,
          value: true,
          className: 'swal-button--confirm'
        }
      }
    })

    if (willDelete) {
      // Eksekusi fungsi penghapusan dan dapatkan response dari backend
      const response: IResponse = await onDelete()

      // Jika penghapusan berhasil
      if (response && response.success) {
        // Tampilkan pesan sukses dari backend
        swal('Data telah dihapus!', {
          icon: 'success',
          text: response.message, // Pesan sukses dari backend
          timer: 1000,
          buttons: false
        })

        // Panggil onSuccess callback jika ada
        if (onSuccess) {
          onSuccess()
        }
      } else {
        // Jika ada error, tampilkan pesan error dari backend
        swal({
          title: 'Gagal!',
          text: response?.message || 'Data gagal dihapus!',
          icon: 'error',
          buttons: {
            confirm: {
              text: 'OK',
              value: true,
              className: 'swal-button--confirm'
            }
          }
        })

        // Panggil onError callback jika ada
        if (onError) {
          onError(response)
        }
      }
    }
  } catch (error) {
    // Menangani action error jika ada kesalahan saat eksekusi
    swal({
      title: 'Gagal!',
      text: 'Terjadi kesalahan saat menghapus data!',
      icon: 'error',
      buttons: {
        confirm: {
          text: 'OK',
          value: true,
          className: 'swal-button--confirm'
        }
      }
    })

    // Memanggil callback error jika ada
    if (onError) {
      onError(error)
    }
  }
}

export const warningConfirmation = async ({
  title = 'Perhatian',
  text,
  confirmButtonText = 'Ok',
  onError // Optional error callback
}: IWarningConfirmationOptions) => {
  try {
    // Show warning confirmation dialog
    const willDelete = await swal({
      title,
      text,
      icon: 'warning',
      buttons: {
        confirm: {
          text: confirmButtonText,
          value: true,
          className: 'swal-button--confirm'
        }
      }
    })

    return willDelete
  } catch (error) {
    if (onError) {
      onError(error)
    } else {
      console.error('Error during deletion:', error)
    }
    return false
  }
}
