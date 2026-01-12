import { useContext } from 'react'
import { SEOContext } from '../../context/SEOContext'

/**
 * Hook personalizado para acceder al contexto de SEO
 *
 * Proporciona métodos para configurar SEO:
 * - defaultConfig - Configuración SEO por defecto
 * - generateSEO(customSEO) - Genera configuración SEO personalizada
 * - generateProjectSEO(project) - Genera SEO para páginas de proyecto
 * - generateContactSEO() - Genera SEO para página de contacto
 * - generateAboutSEO() - Genera SEO para página sobre mí
 *
 * @returns {Object} Métodos para configurar SEO
 * @throws {Error} Si se usa fuera del SEOProvider
 *
 * @example
 * ```jsx
 * import { useSEO, SEO } from '@hooks'
 *
 * function ProjectPage({ project }) {
 *   const { generateProjectSEO } = useSEO()
 *   const seoConfig = generateProjectSEO(project)
 *
 *   return (
 *     <>
 *       <SEO {...seoConfig} />
 *       <div>{project.name}</div>
 *     </>
 *   )
 * }
 * ```
 */
export const useSEO = () => {
  const context = useContext(SEOContext)

  if (!context) {
    throw new Error('useSEO debe usarse dentro de un SEOProvider')
  }

  return context
}

// Re-exportar SEO component para conveniencia
export { SEO } from '../../context/SEOContext'

export default useSEO
