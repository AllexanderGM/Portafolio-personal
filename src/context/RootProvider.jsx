import PropTypes from 'prop-types'
import LibrariesProvider from './LibrariesProvider'
import { ErrorProvider } from './ErrorContext'
import { LoadingProvider } from './LoadingContext'
import { GeneralProvider } from './GeneralContext'
import { MotionProvider } from '@library/animation'

/**
 * RootProvider
 * Componente raíz que agrupa TODOS los providers de la aplicación
 * en el orden correcto de dependencias
 *
 * Jerarquía de providers (de afuera hacia adentro):
 * 1. LibrariesProvider - Providers de librerías externas (HeroUI, SEO, Toast)
 * 2. MotionProvider - LazyMotion para optimizar framer-motion
 * 3. ErrorProvider - Manejo centralizado de errores con ErrorBoundary
 * 4. LoadingProvider - Estados de carga globales
 * 5. GeneralProvider - Contexto general de la aplicación (theme, cursor, data)
 *
 * Nota: ProjectsProvider se usa localmente en la página de proyectos,
 * no globalmente, por lo que no está incluido aquí
 */
const RootProvider = ({ children }) => {
  return (
    <LibrariesProvider>
      <MotionProvider>
        <ErrorProvider>
          <LoadingProvider>
            <GeneralProvider>{children}</GeneralProvider>
          </LoadingProvider>
        </ErrorProvider>
      </MotionProvider>
    </LibrariesProvider>
  )
}

RootProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default RootProvider
