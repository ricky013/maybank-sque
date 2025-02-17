import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface AlertDialogProps {
  titleAlert: string
  contentAlert: string
  onClose: () => void
  type?: string
}

const AlertDialog: React.FC<AlertDialogProps> = ({ titleAlert, contentAlert, onClose, type = 'warning' }) => {
  const [dialogOpen, setDialogOpen] = useState(true)

  const handleDialogClose = () => {
    setDialogOpen(false)
    onClose() // Notify parent to close the alert
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent onClick={handleDialogClose}>
        {type === 'warning' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        )}
        <DialogHeader>
          <DialogTitle>{titleAlert}</DialogTitle>
          <DialogDescription>{contentAlert}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            variant={'active'}
            onClick={handleDialogClose} // Close on button click
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
