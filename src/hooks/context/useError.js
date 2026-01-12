import { useContext } from 'react'
import { ErrorContext } from '../../context/ErrorContext'

/**
 * Hook personalizado para acceder al contexto de Error
 *
 * Proporciona control sobre el manejo de errores global:
 * - error - Error actual
 * - showError(error, title, description) - Muestra un error
 * - clearError() - Limpia el error actual
 * - handleAPIError(error) - Maneja errores de API
 * - handleValidationError(errors) - Maneja errores de validación
 * - withErrorHandling(asyncFn, errorTitle) - Wrapper con manejo de errores
 *
 * @returns {Object} Estado y métodos de error
 * @throws {Error} Si se usa fuera del ErrorProvider
 *
 * @example
 * ```jsx
 * import { useError } from '@hooks'
 *
 * function MyComponent() {
 *   const { withErrorHandling, showError } = useError()
 *
 *   const fetchData = async () => {
 *     await withErrorHandling(
 *       () => fetch('/api/data'),
 *       'Error al cargar datos'
 *     )
 *   }
 *
 *   const handleCustomError = () => {
 *     showError(
 *       new Error('Error personalizado'),
 *       'Algo salió mal',
 *       'Por favor intenta nuevamente'
 *     )
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={fetchData}>Cargar datos</button>
 *       <button onClick={handleCustomError}>Mostrar error</button>
 *     </div>
 *   )
 * }
 * ```
 */
export const useError = () => {
  const context = useContext(ErrorContext)

  if (!context) {
    throw new Error('useError debe usarse dentro de un ErrorProvider')
  }

  return context
}

// Re-exportar ErrorBoundary para conveniencia
export { ErrorBoundary } from '../../context/ErrorContext'

export default useError
