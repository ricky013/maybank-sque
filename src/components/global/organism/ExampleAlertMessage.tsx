import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

const AlertMessage = () => {
  const handleAlertError = () => {
    toast.error('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm'
    })
  }
  const handleAlertSuccess = () => {
    toast.success('Event has been created')
  }

  const handleAlertPromise = () => {
    try {
      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000))

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data: any) => {
          return `${data.name} toast has been added`
        },
        error: (error: any) => {
          return `${error} toast has been added`
        }
      })
    } catch (error: any) {
      toast.error(error.message, {
        description: 'Monday, January 3rd at 6:00pm'
      })
    }
  }

  return (
    <div>
      <Button variant={'active'} onClick={handleAlertPromise}>
        Send
      </Button>
      <Button variant={'active'} onClick={handleAlertSuccess}>
        Alert Sukses
      </Button>
      <Button variant={'danger'} onClick={handleAlertError}>
        Alert Error
      </Button>
      <Toaster />
    </div>
  )
}

export default AlertMessage
