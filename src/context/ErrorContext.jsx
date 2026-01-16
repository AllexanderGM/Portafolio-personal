import { createContext, useState, useMemo, useCallback, Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

export const ErrorContext = createContext(null)

/**
 * Componente de Modal de Error
 */
const ErrorModal = ({ error, onClose }) => {
  if (!error) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className='max-w-md w-full rounded-2xl bg-white shadow-2xl dark:bg-gray-800 overflow-hidden'
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className='bg-red-500 px-6 py-4'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20'>
              <span className='text-2xl'>⚠️</span>
            </div>
            <h3 className='text-xl font-bold text-white'>{error.title || 'Error'}</h3>
          </div>
        </div>

        {/* Body */}
        <div className='px-6 py-4'>
          <p className='text-gray-700 dark:text-gray-300'>{error.message || 'Ha ocurrido un error inesperado'}</p>

          {error.details && (
            <div className='mt-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-700'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                <strong>Detalles:</strong> {error.details}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex justify-end gap-3 bg-gray-50 px-6 py-4 dark:bg-gray-900'>
          <button onClick={onClose} className='rounded-lg bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600'>
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

ErrorModal.propTypes = {
  error: PropTypes.shape({
    id: PropTypes.number,
    timestamp: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    details: PropTypes.string,
    type: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
}

/**
 * Error Boundary Component
 * Captura errores de React en el árbol de componentes
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)
    this.setState({ errorInfo })

    // Si hay un callback onError, lo ejecuta
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Puedes personalizar el UI de error aquí
      return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900'>
          <div className='max-w-md w-full rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30'>
                <span className='text-3xl'>💥</span>
              </div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>¡Oops! Algo salió mal</h2>
            </div>

            <p className='mb-4 text-gray-700 dark:text-gray-300'>
              La aplicación encontró un error inesperado. Por favor, intenta recargar la página.
            </p>

            {this.state.error && (
              <div className='mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20'>
                <p className='text-sm text-red-800 dark:text-red-300'>
                  <strong>Error:</strong> {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className='flex gap-3'>
              <button
                onClick={() => globalThis.location.reload()}
                className='flex-1 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600'>
                Recargar página
              </button>
              <button
                onClick={this.resetError}
                className='flex-1 rounded-lg bg-gray-500 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-600'>
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  onError: PropTypes.func
}

/**
 * Provider de Error para manejo centralizado de errores
 * Proporciona métodos para mostrar errores de diferentes tipos
 */
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [errorHistory, setErrorHistory] = useState([])

  /**
   * Muestra un error en modal
   * @param {Object} errorData - Datos del error
   */
  const showError = useCallback(errorData => {
    const errorObject = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      title: errorData.title || 'Error',
      message: errorData.message || 'Ha ocurrido un error inesperado',
      details: errorData.details || null,
      type: errorData.type || 'error'
    }

    setError(errorObject)
    setErrorHistory(prev => [...prev, errorObject])
  }, [])

  /**
   * Cierra el modal de error actual
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Limpia el historial de errores
   */
  const clearErrorHistory = useCallback(() => {
    setErrorHistory([])
  }, [])

  /**
   * Maneja errores de red/API
   * @param {Error} err - Error capturado
   * @param {string} customMessage - Mensaje personalizado
   */
  const handleAPIError = useCallback(
    (err, customMessage = null) => {
      const message = customMessage || err.response?.data?.message || err.message || 'Error de conexión con el servidor'

      showError({
        title: 'Error de API',
        message,
        details: err.response?.status ? `Código de estado: ${err.response.status}` : null,
        type: 'api'
      })
    },
    [showError]
  )

  /**
   * Maneja errores de validación
   * @param {Object} validationErrors - Errores de validación
   */
  const handleValidationError = useCallback(
    validationErrors => {
      const errorMessages = Object.entries(validationErrors)
        .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
        .join('\n')

      showError({
        title: 'Error de Validación',
        message: 'Por favor corrige los siguientes errores:',
        details: errorMessages,
        type: 'validation'
      })
    },
    [showError]
  )

  /**
   * Wrapper para funciones asíncronas con manejo de errores
   * @param {Function} asyncFn - Función asíncrona
   * @param {string} errorMessage - Mensaje de error personalizado
   */
  const withErrorHandling = useCallback(
    async (asyncFn, errorMessage = null) => {
      try {
        return await asyncFn()
      } catch (err) {
        handleAPIError(err, errorMessage)
        throw err
      }
    },
    [handleAPIError]
  )

  const value = useMemo(
    () => ({
      error,
      errorHistory,
      showError,
      clearError,
      clearErrorHistory,
      handleAPIError,
      handleValidationError,
      withErrorHandling
    }),
    [error, errorHistory, showError, clearError, clearErrorHistory, handleAPIError, handleValidationError, withErrorHandling]
  )

  return (
    <ErrorContext.Provider value={value}>
      <ErrorBoundary onError={err => handleAPIError(err)}>
        {children}
        <AnimatePresence>{error && <ErrorModal error={error} onClose={clearError} />}</AnimatePresence>
      </ErrorBoundary>
    </ErrorContext.Provider>
  )
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired
}
