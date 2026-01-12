import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'

/**
 * Hook personalizado para acceder al contexto General
 *
 * Proporciona acceso a:
 * - Información social (links, email, etc.)
 * - Rutas de navegación
 * - Estado del cursor (cursorActive, activeCursor, inactiveCursor)
 * - Tema (theme, toggleTheme, setThemeMode, isDark, isLight)
 * - Accesibilidad (fontScale, contrastMode, grayscaleMode, underlineLinks, reduceMotion)
 * - Estado de primera carga (firstLoad, finishFirstLoad)
 *
 * @returns {Object} Estado y métodos generales de la aplicación
 * @throws {Error} Si se usa fuera del GeneralProvider
 *
 * @example
 * ```jsx
 * import { useGeneral } from '@hooks'
 *
 * function MyComponent() {
 *   const { theme, toggleTheme, social, route } = useGeneral()
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Tema actual: {theme}
 *     </button>
 *   )
 * }
 * ```
 */
export const useGeneral = () => {
  const context = useContext(GeneralContext)

  if (!context) {
    throw new Error('useGeneral debe usarse dentro de un GeneralProvider')
  }

  return context
}

export default useGeneral
