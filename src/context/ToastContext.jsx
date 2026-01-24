import { createContext, useMemo, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// Crear contexto
export const ToastContext = createContext(null)

/**
 * Provider de Toast para notificaciones globales
 * Proporciona metodos para mostrar notificaciones de exito, error, info, etc.
 */
export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null)
  const loadPromiseRef = useRef(null)
  const queuedCallsRef = useRef([])
  const mountedRef = useRef(true)
  const [ToasterComponent, setToasterComponent] = useState(null)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const loadToastModule = useCallback(() => {
    if (toastRef.current) {
      return Promise.resolve(toastRef.current)
    }
    if (loadPromiseRef.current) {
      return loadPromiseRef.current
    }

    loadPromiseRef.current = import('react-hot-toast')
      .then(mod => {
        const toastModule = mod.toast ?? mod.default
        toastRef.current = toastModule
        if (mountedRef.current) {
          setToasterComponent(() => mod.Toaster)
        }
        const queued = queuedCallsRef.current
        queuedCallsRef.current = []
        queued.forEach(call => call(toastModule))
        return toastModule
      })
      .catch(error => {
        loadPromiseRef.current = null
        throw error
      })

    return loadPromiseRef.current
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))
    const cancel = window.cancelIdleCallback || clearTimeout
    const idleId = schedule(() => {
      loadToastModule()
    })
    return () => cancel(idleId)
  }, [loadToastModule])

  const runToast = useCallback(
    callback => {
      if (toastRef.current) {
        return callback(toastRef.current)
      }
      queuedCallsRef.current.push(callback)
      loadToastModule()
      return null
    },
    [loadToastModule]
  )

  const showSuccess = useCallback(
    (message, options = {}) => {
      return runToast(toast => toast.success(message, {
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
      }))
    },
    [runToast]
  )

  const showError = useCallback(
    (message, options = {}) => {
      return runToast(toast => toast.error(message, {
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
      }))
    },
    [runToast]
  )

  const showInfo = useCallback(
    (message, options = {}) => {
      return runToast(toast => toast(message, {
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
      }))
    },
    [runToast]
  )

  const showWarning = useCallback(
    (message, options = {}) => {
      return runToast(toast => toast(message, {
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
      }))
    },
    [runToast]
  )

  const showLoading = useCallback(
    (message = 'Cargando...', options = {}) => {
      return runToast(toast => toast.loading(message, {
        position: 'top-right',
        style: {
          background: '#6B7280',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px'
        },
        ...options
      }))
    },
    [runToast]
  )

  const dismissToast = useCallback(
    toastId => runToast(toast => toast.dismiss(toastId)),
    [runToast]
  )

  const dismissAllToasts = useCallback(
    () => runToast(toast => toast.dismiss()),
    [runToast]
  )

  // Promise toast - util para operaciones asincronas
  const showPromise = useCallback(
    (promise, messages, options = {}) => {
      return runToast(toast => toast.promise(
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
      ))
    },
    [runToast]
  )

  // Custom toast con render personalizado
  const showCustom = useCallback(
    (render, options = {}) => {
      return runToast(toast => toast.custom(render, {
        duration: 4000,
        position: 'top-right',
        ...options
      }))
    },
    [runToast]
  )

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
    [showSuccess, showError, showInfo, showWarning, showLoading, showPromise, showCustom, dismissToast, dismissAllToasts]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {ToasterComponent && (
        <ToasterComponent
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
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
}
