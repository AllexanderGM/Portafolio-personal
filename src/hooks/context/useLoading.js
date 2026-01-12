import { useContext } from 'react'
import { LoadingContext } from '../../context/LoadingContext'

/**
 * Hook personalizado para acceder al contexto de Loading
 *
 * Proporciona control sobre el estado de carga global:
 * - isLoading - Estado booleano de carga
 * - loadingMessage - Mensaje de carga actual
 * - loadingCount - Contador de cargas activas
 * - startLoading(message) - Inicia un estado de carga
 * - stopLoading() - Detiene un estado de carga
 * - withLoading(asyncFn, message) - Wrapper para operaciones asíncronas
 *
 * @returns {Object} Estado y métodos de loading
 * @throws {Error} Si se usa fuera del LoadingProvider
 *
 * @example
 * ```jsx
 * import { useLoading } from '@hooks'
 *
 * function MyComponent() {
 *   const { isLoading, withLoading } = useLoading()
 *
 *   const fetchData = async () => {
 *     await withLoading(
 *       () => fetch('/api/data'),
 *       'Cargando datos...'
 *     )
 *   }
 *
 *   return (
 *     <div>
 *       {isLoading && <p>Cargando...</p>}
 *       <button onClick={fetchData}>Cargar</button>
 *     </div>
 *   )
 * }
 * ```
 */
export const useLoading = () => {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoading debe usarse dentro de un LoadingProvider')
  }

  return context
}

export default useLoading
