import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'

/**
 * Hook personalizado para acceder al contexto de Toast
 *
 * Proporciona métodos para mostrar notificaciones tipo toast:
 * - success(message, options) - Notificación de éxito
 * - error(message, options) - Notificación de error
 * - info(message, options) - Notificación informativa
 * - warning(message, options) - Notificación de advertencia
 * - loading(message, options) - Notificación de carga
 * - promise(promise, messages, options) - Notificación para promesas
 * - custom(render, options) - Notificación personalizada
 * - dismiss(toastId) - Cerrar notificación específica
 * - dismissAll() - Cerrar todas las notificaciones
 *
 * @returns {Object} Métodos para mostrar notificaciones
 * @throws {Error} Si se usa fuera del ToastProvider
 *
 * @example
 * ```jsx
 * import { useToast } from '@hooks'
 *
 * function MyComponent() {
 *   const toast = useToast()
 *
 *   const handleSuccess = () => {
 *     toast.success('Operación exitosa')
 *   }
 *
 *   const handleAsyncOperation = async () => {
 *     await toast.promise(
 *       fetchData(),
 *       {
 *         loading: 'Cargando...',
 *         success: 'Datos cargados',
 *         error: 'Error al cargar'
 *       }
 *     )
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={handleSuccess}>Mostrar éxito</button>
 *       <button onClick={handleAsyncOperation}>Operación async</button>
 *     </div>
 *   )
 * }
 * ```
 */
export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider')
  }

  return context
}

export default useToast
