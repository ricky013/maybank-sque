import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className={`toaster group `}
      toastOptions={{
        classNames: {
          error: 'text-red-600 border border-red-600/10 bg-opacity-20 bg-red-600 shadow-lg rounded-md',
          success: 'text-green-600 border border-green-600/10 bg-opacity-20 bg-green-600 shadow-lg rounded-md',
          warning: 'text-yellow-600 border border-yellow-600/10 bg-opacity-20 bg-yellow-600 shadow-lg rounded-md',
          info: 'text-blue-600 border border-blue-600/10 bg-opacity-20 bg-blue-600 shadow-lg rounded-md',
          loading: 'text-blue-600 border border-blue-600/10 bg-opacity-20 bg-blue-600 shadow-lg rounded-md',
          actionButton:
            'group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50 dark:group-[.toast]:bg-slate-50 dark:group-[.toast]:text-slate-900',
          cancelButton:
            'group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 dark:group-[.toast]:bg-slate-800 dark:group-[.toast]:text-slate-400'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
