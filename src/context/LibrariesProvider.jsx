import PropTypes from 'prop-types'
import { useNavigate, useHref } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/system'
import { SEOProvider } from './SEOContext'
import { ToastProvider } from './ToastContext'

/**
 * LibrariesProvider
 * Agrupa todos los providers de librerías externas en un solo componente
 * Esto facilita el mantenimiento y la organización del código
 *
 * Librerías incluidas:
 * - HeroUI: Sistema de componentes UI
 * - SEO (React Helmet Async): Meta tags dinámicos
 * - Toast (React Hot Toast): Sistema de notificaciones
 */
const LibrariesProvider = ({ children }) => {
  const navigate = useNavigate()

  // Configuración de SEO por defecto
  const defaultSEO = {
    title: 'Jeisson Alexander | Desarrollador Web Full Stack',
    description:
      'Portafolio profesional de Jeisson Alexander Gavilán Montañez, desarrollador web full stack especializado en React, Node.js y tecnologías modernas.',
    keywords: 'desarrollo web, portafolio, react, javascript, frontend, backend, full stack, node.js, jeisson alexander',
    author: 'Jeisson Alexander Gavilán Montañez',
    image: '/og-image.jpg',
    url: globalThis.location?.origin ?? '',
    type: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@allexander_gm',
    lang: 'es'
  }

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <SEOProvider defaultSEO={defaultSEO}>
        <ToastProvider>{children}</ToastProvider>
      </SEOProvider>
    </HeroUIProvider>
  )
}

LibrariesProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default LibrariesProvider
