import { toast } from 'sonner'

// Default toast duration in milliseconds
const DEFAULT_DURATION = 5000
const ERROR_DURATION = 7000

export const showToast = {
	success: (message: string, description?: string) => {
		toast.success(message, {
			description,
			duration: DEFAULT_DURATION,
		})
	},

	error: (message: string, description?: string) => {
		toast.error(message, {
			description,
			duration: ERROR_DURATION,
		})
	},

	warning: (message: string, description?: string) => {
		toast.warning(message, {
			description,
			duration: DEFAULT_DURATION,
		})
	},

	info: (message: string, description?: string) => {
		toast.info(message, {
			description,
			duration: DEFAULT_DURATION,
		})
	},

	loading: (message: string) => {
		return toast.loading(message)
	},

	promise: <T>(
		promise: Promise<T>,
		{
			loading,
			success,
			error,
		}: {
			loading: string
			success: string | ((data: T) => string)
			error: string | ((error: Error) => string)
		}
	) => {
		return toast.promise(promise, {
			loading,
			success,
			error,
		})
	},
}

// Convenience exports
export const toastSuccess = showToast.success
export const toastError = showToast.error
export const toastWarning = showToast.warning
export const toastInfo = showToast.info
export const toastLoading = showToast.loading
export const toastPromise = showToast.promise
