import { createContext, useState, useMemo, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

export const LoadingContext = createContext(null)

/**
 * Componente de Spinner de carga
 */
const LoadingSpinner = ({ message }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      style={{ margin: 0 }}>
      <m.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className='flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-2xl dark:bg-gray-800'>
        {/* Spinner animado */}
        <m.div
          className='h-16 w-16 rounded-full border-4 border-gray-200 border-t-blue-500'
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Mensaje de carga */}
        {message && (
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='text-center text-lg font-medium text-gray-700 dark:text-gray-200'>
            {message}
          </m.p>
        )}
      </m.div>
    </m.div>
  )
}

LoadingSpinner.propTypes = {
  message: PropTypes.string
}

/**
 * Provider de Loading para estados de carga globales
 * Proporciona un spinner global con mensaje personalizado
 */
export const LoadingProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const [loadingCount, setLoadingCount] = useState(0)
  const isLoading = loadingCount > 0

  /**
   * Inicia el estado de carga con un mensaje opcional
   * @param {string} customMessage - Mensaje personalizado
   */
  const startLoading = useCallback((customMessage = 'Cargando...') => {
    setMessage(customMessage)
    setLoadingCount(prev => prev + 1)
  }, [])

  /**
   * Detiene el estado de carga
   * Solo se oculta el spinner cuando todas las cargas han terminado
   */
  const stopLoading = useCallback(() => {
    setLoadingCount(prev => {
      const newCount = Math.max(0, prev - 1)
      if (newCount === 0) {
        setMessage('')
      }
      return newCount
    })
  }, [])

  /**
   * Fuerza el cierre del loading sin importar el contador
   */
  const forceStopLoading = useCallback(() => {
    setMessage('')
    setLoadingCount(0)
  }, [])

  /**
   * Actualiza el mensaje sin cambiar el estado
   * @param {string} newMessage - Nuevo mensaje
   */
  const updateMessage = useCallback(newMessage => {
    setMessage(newMessage)
  }, [])

  /**
   * Ejecuta una función asíncrona con loading automático
   * @param {Function} asyncFn - Función asíncrona a ejecutar
   * @param {string} loadingMessage - Mensaje durante la carga
   * @returns {Promise} Resultado de la función
   */
  const withLoading = useCallback(
    async (asyncFn, loadingMessage = 'Cargando...') => {
      startLoading(loadingMessage)
      try {
        return await asyncFn()
      } finally {
        stopLoading()
      }
    },
    [startLoading, stopLoading]
  )

  const value = useMemo(
    () => ({
      isLoading,
      loadingCount,
      message,
      startLoading,
      stopLoading,
      forceStopLoading,
      updateMessage,
      withLoading
    }),
    [isLoading, loadingCount, message, startLoading, stopLoading, forceStopLoading, updateMessage, withLoading]
  )

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <AnimatePresence>{isLoading && <LoadingSpinner message={message} />}</AnimatePresence>
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired
}
