import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'

const ToastSonnerError = ({ message, t, toast }: { message: string; t: any; toast: any }) => {
  return (
    <div className="md:w-[360px]  w-[300px] border border-red-600/10 bg-opacity-20 bg-red-600 shadow-lg rounded-md">
      <header className="text-secondary-foreground  flex justify-between items-center px-2 pt-2 pb-1 ">
        <h4 className="font-medium ">Error</h4>
        <button
          className="bg-red-700 bg-opacity-20 transiti hover:bg-red-600 hover:text-white flex-center bg-muted rounded-full p-[2px]"
          onClick={() => toast.dismiss(t)}
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      <Separator className="bg-white" />
      <p className="text-sm px-2 pt-1 pb-2 text-wrap">{message}</p>
    </div>
  )
}

export default ToastSonnerError
