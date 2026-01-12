import { createContext, useMemo } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import PropTypes from 'prop-types'

// Crear contexto
export const SEOContext = createContext(null)

/**
 * Componente SEO avanzado con soporte para JSON-LD y meta tags optimizados
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción meta
 * @param {string} props.keywords - Palabras clave
 * @param {string} props.author - Autor del contenido
 * @param {string} props.image - URL de la imagen OG
 * @param {string} props.imageAlt - Texto alternativo de la imagen
 * @param {string} props.url - URL canonical
 * @param {string} props.type - Tipo de contenido OG
 * @param {string} props.twitterCard - Tipo de tarjeta de Twitter
 * @param {string} props.twitterSite - Usuario de Twitter
 * @param {string} props.lang - Idioma de la página
 * @param {string} props.canonical - URL canonical explícita
 * @param {Object} props.structuredData - Datos estructurados JSON-LD
 * @param {Array} props.breadcrumbs - Breadcrumbs para navegación
 * @param {string} props.publishedTime - Fecha de publicación (para articles)
 * @param {string} props.modifiedTime - Fecha de modificación (para articles)
 */
export const SEO = ({
  title = 'Alexander Gavilán | Software Developer',
  description = 'Portafolio de desarrollador web',
  keywords = 'desarrollo web, portafolio, react, javascript',
  author = 'Jeisson Alexander Gavilán Murcia',
  image = '/share-img.png',
  imageAlt = 'Alexander Gavilán - Software Developer',
  url = globalThis.window?.location?.href ?? '',
  type = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@allexandergm',
  lang = 'es',
  canonical,
  structuredData = null,
  breadcrumbs = null,
  publishedTime = null,
  modifiedTime = null,
  noindex = false
}) => {
  // Construir URL completa para imágenes
  const imageUrl = image?.startsWith('http') ? image : `https://alexandergm.com${image}`
  const canonicalUrl = canonical || url

  return (
    <Helmet>
      {/* HTML lang */}
      <html lang={lang} />

      {/* Meta tags básicos */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='author' content={author} />

      {/* Canonical URL */}
      <link rel='canonical' href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:image:alt' content={imageAlt} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:site_name' content='Alexander Gavilán' />
      <meta property='og:locale' content='es_CO' />
      <meta property='og:locale:alternate' content='en_US' />

      {/* Article meta tags */}
      {type === 'article' && publishedTime && <meta property='article:published_time' content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property='article:modified_time' content={modifiedTime} />}
      {type === 'article' && <meta property='article:author' content={author} />}

      {/* Twitter Card */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:url' content={canonicalUrl} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />
      <meta name='twitter:image:alt' content={imageAlt} />
      {twitterSite && <meta name='twitter:site' content={twitterSite} />}
      {twitterSite && <meta name='twitter:creator' content={twitterSite} />}

      {/* Robots - Control de indexación */}
      <meta name='robots' content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name='googlebot' content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name='bingbot' content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* JSON-LD Structured Data */}
      {structuredData && <script type='application/ld+json'>{JSON.stringify(structuredData, null, 0)}</script>}

      {/* Breadcrumbs JSON-LD */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type='application/ld+json'>
          {JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: crumb.url
              }))
            },
            null,
            0
          )}
        </script>
      )}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterSite: PropTypes.string,
  lang: PropTypes.string,
  canonical: PropTypes.string,
  structuredData: PropTypes.object,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  noindex: PropTypes.bool
}

/**
 * Provider de SEO que incluye HelmetProvider
 * Proporciona métodos para configurar SEO globalmente
 */
export const SEOProvider = ({ children }) => {
  const value = useMemo(() => ({}), [])

  return (
    <HelmetProvider>
      <SEOContext.Provider value={value}>{children}</SEOContext.Provider>
    </HelmetProvider>
  )
}

SEOProvider.propTypes = {
  children: PropTypes.node.isRequired
}
