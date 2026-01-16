import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import BreadcrumbList from './components/molecules/BreadcrumbList'
import { useGeneral } from '@hooks'

import './breadcrumb.scss'

const HASH_LABELS = {
  '#about': 'Sobre mí',
  '#technologyID': 'Tecnologías'
}

const formatSegmentLabel = segment => {
  const normalized = segment.replaceAll(/[-_]+/g, ' ').trim()
  if (!normalized) return ''

  return normalized.replaceAll(/\b\w/g, char => char.toUpperCase())
}

const Breadcrumb = () => {
  const location = useLocation()
  const { route } = useGeneral()

  const items = useMemo(() => {
    const labels = {
      [route.home]: 'Inicio',
      [route.about]: 'Sobre mí',
      [route.projects]: 'Proyectos',
      [route.contact]: 'Contacto',
      [route.info]: 'Información'
    }

    const breadcrumbItems = [
      {
        label: labels[route.home] || 'Inicio',
        path: route.home
      }
    ]

    const segments = location.pathname.split('/').filter(Boolean)
    let currentPath = ''

    segments.forEach(segment => {
      currentPath += `/${segment}`
      const label = labels[currentPath] || formatSegmentLabel(segment) || 'Página'

      breadcrumbItems.push({
        label,
        path: currentPath
      })
    })

    const hashLabel = HASH_LABELS[location.hash]
    if (hashLabel) {
      breadcrumbItems.push({
        label: hashLabel,
        path: `${location.pathname}${location.hash}`
      })
    }

    return breadcrumbItems
  }, [location.hash, location.pathname, route])

  return (
    <nav className='breadcrumb' aria-label='Miga de pan'>
      <div className='breadcrumb_container'>
        <BreadcrumbList items={items} />
      </div>
    </nav>
  )
}

export default Breadcrumb
