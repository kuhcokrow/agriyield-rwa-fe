import { toast } from 'sonner'

interface ToastPromiseOptions {
  loading?: string
  success?: string | ((data: any) => string)
  error?: string | ((error: any) => string)
}

export const toastPromise = <T,>(
  promise: Promise<T>,
  options: ToastPromiseOptions
) => {
  return toast.promise(promise, {
    loading: options.loading || 'Loading...',
    success: options.success || 'Success!',
    error: options.error || 'Something went wrong',
  })
}

// Helper to check if error is user rejection
const isUserRejection = (error: any): boolean => {
  const message = error?.message?.toLowerCase() || ''
  return (
    message.includes('user rejected') ||
    message.includes('user denied') ||
    message.includes('cancelled') ||
    message.includes('cancel') ||
    message.includes('denied')
  )
}

// Quick toast helpers
export const toastSuccess = (message: string) => {
  toast.success(message, {
    description: new Date().toLocaleTimeString(),
  })
}

export const toastError = (message: string, description?: string | any) => {
  const isRejection = isUserRejection(description)
  
  if (isRejection) {
    toast.error('Transaction cancelled', {
      description: 'You rejected the transaction in your wallet',
    })
  } else {
    toast.error(message, {
      description: typeof description === 'string' 
        ? description 
        : (description?.message || new Date().toLocaleTimeString()),
    })
  }
}

export const toastLoading = (message: string) => {
  return toast.loading(message)
}

export const toastDismiss = (toastId: string | number) => {
  toast.dismiss(toastId)
}
