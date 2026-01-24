import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FolderKanban, Mail, UserRound } from 'lucide-react'

import { useGeneral } from '@hooks'

const DEFAULT_HOME_HASH = '#about'

const resolveActiveLink = ({ pathname, hash, home }) => {
  if (pathname === home && !hash) {
    return `${home}${DEFAULT_HOME_HASH}`
  }
  return `${pathname}${hash}`
}

const useNavState = () => {
  const location = useLocation()
  const { route } = useGeneral()

  const navItems = useMemo(
    () => [
      {
        Icon: UserRound,
        route: `${route.home}`,
        text: 'Sobre mí'
      },
      {
        Icon: FolderKanban,
        route: route.projects,
        text: 'Proyectos'
      },
      {
        Icon: Mail,
        route: route.contact,
        text: 'Contacto'
      }
    ],
    [route.home, route.projects, route.contact]
  )

  const [activeLink, setActiveLink] = useState(() =>
    resolveActiveLink({ pathname: location.pathname, hash: location.hash, home: route.home })
  )

  useEffect(() => {
    setActiveLink(resolveActiveLink({ pathname: location.pathname, hash: location.hash, home: route.home }))
  }, [location.pathname, location.hash, route.home])

  return {
    navItems,
    activeLink,
    setActiveLink
  }
}

export default useNavState
