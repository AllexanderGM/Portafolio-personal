import { BrowserRouter } from 'react-router-dom'
import RootProvider from '../context/RootProvider'
import { useGeneral } from '../hooks'

// Componentes
import Cursor from '@library/cursor'
import Splash from '@library/splash'
import Routes from './Routes.jsx'

/**
 * AppContent - Contenido principal de la aplicación
 * Separado para poder usar hooks dentro del RootProvider
 */
const AppContent = () => {
  const { route, firstLoad, finishFirstLoad } = useGeneral()

  return (
    <>
      {firstLoad && <Splash onFinish={finishFirstLoad} />}
      <Cursor />
      <Routes route={route} />
    </>
  )
}

/**
 * App - Componente raíz de la aplicación
 * Simplificado gracias al patrón de providers
 */
const App = () => {
  return (
    <BrowserRouter>
      <RootProvider>
        <AppContent />
      </RootProvider>
    </BrowserRouter>
  )
}

export default App
