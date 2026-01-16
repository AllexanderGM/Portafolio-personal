import { createContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import toast, { Toaster } from 'react-hot-toast'

// Crear contexto
export const ToastContext = createContext(null)

/**
 * Provider de Toast para notificaciones globales
 * Proporciona métodos para mostrar notificaciones de éxito, error, info, etc.
 */
export const ToastProvider = ({ children }) => {
  // Métodos para diferentes tipos de notificaciones
  const showSuccess = (message, options = {}) => {
    return toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981'
      },
      ...options
    })
  }

  const showError = (message, options = {}) => {
    return toast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#EF4444'
      },
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    return toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#3B82F6',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px'
      },
      ...options
    })
  }

  const showWarning = (message, options = {}) => {
    return toast(message, {
      duration: 4500,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px'
      },
      ...options
    })
  }

  const showLoading = (message = 'Cargando...', options = {}) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#6B7280',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px'
      },
      ...options
    })
  }

  const dismissToast = toastId => {
    toast.dismiss(toastId)
  }

  const dismissAllToasts = () => {
    toast.dismiss()
  }

  // Promise toast - útil para operaciones asíncronas
  const showPromise = (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || 'Cargando...',
        success: messages.success || 'Completado',
        error: messages.error || 'Error'
      },
      {
        position: 'top-right',
        style: {
          padding: '16px',
          borderRadius: '8px'
        },
        ...options
      }
    )
  }

  // Custom toast con render personalizado
  const showCustom = (render, options = {}) => {
    return toast.custom(render, {
      duration: 4000,
      position: 'top-right',
      ...options
    })
  }

  const value = useMemo(
    () => ({
      success: showSuccess,
      error: showError,
      info: showInfo,
      warning: showWarning,
      loading: showLoading,
      promise: showPromise,
      custom: showCustom,
      dismiss: dismissToast,
      dismissAll: dismissAllToasts
    }),
    []
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          right: 20
        }}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
            maxWidth: '500px'
          }
        }}
      />
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
}
