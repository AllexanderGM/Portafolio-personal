import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useGeneral } from '@hooks'

const HASH_LABELS = {
  '#about': 'Sobre mí',
  '#technologyID': 'Tecnologías'
}

const formatSegmentLabel = segment => {
  const normalized = segment.replaceAll(/[-_]+/g, ' ').trim()
  if (!normalized) return ''

  return normalized.replaceAll(/\b\w/g, char => char.toUpperCase())
}

const buildBreadcrumbItems = ({ pathname, hash, home, about, projects, contact, info }) => {
  const labels = {
    [home]: 'Inicio',
    [about]: 'Sobre mí',
    [projects]: 'Proyectos',
    [contact]: 'Contacto',
    [info]: 'Información'
  }

  const breadcrumbItems = [
    {
      label: labels[home] || 'Inicio',
      path: home
    }
  ]

  const segments = pathname.split('/').filter(Boolean)
  let currentPath = ''

  segments.forEach(segment => {
    currentPath += `/${segment}`
    const label = labels[currentPath] || formatSegmentLabel(segment) || 'Página'

    breadcrumbItems.push({
      label,
      path: currentPath
    })
  })

  const hashLabel = HASH_LABELS[hash]
  if (hashLabel) {
    breadcrumbItems.push({
      label: hashLabel,
      path: `${pathname}${hash}`
    })
  }

  return breadcrumbItems
}

const useBreadcrumbItems = () => {
  const location = useLocation()
  const { route } = useGeneral()
  const { home, about, projects, contact, info } = route

  return useMemo(
    () =>
      buildBreadcrumbItems({
        pathname: location.pathname,
        hash: location.hash,
        home,
        about,
        projects,
        contact,
        info
      }),
    [location.pathname, location.hash, home, about, projects, contact, info]
  )
}

export default useBreadcrumbItems
