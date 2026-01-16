import { useEffect, useState } from 'react'
import { FolderKanban, Mail, UserRound } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import './nav.scss'

import Navbar from '@library/nav/components/organisms/Navbar'
import Accessibility from '@library/nav/components/organisms/Accessibility'
import { useGeneral } from '@hooks'

const Nav = () => {
  const location = useLocation()
  const { route } = useGeneral()
  const [activeLink, setActiveLink] = useState(() => {
    const path = `${globalThis.location.pathname}${globalThis.location.hash}`

    if (globalThis.location.pathname === route.home && !globalThis.location.hash) {
      return `${route.home}#about`
    }
    return path
  })

  useEffect(() => {
    const path = `${location.pathname}${location.hash}`
    if (location.pathname === route.home && !location.hash) {
      setActiveLink(`${route.home}#about`)
      return
    }
    setActiveLink(path)
  }, [location.pathname, location.hash, route.home])

  const navItems = [
    {
      Icon: UserRound,
      route: `${route.home}#about`,
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
  ]

  return (
    <div className='nav-shell'>
      <Navbar navItems={navItems} activeLink={activeLink} setActiveLink={setActiveLink} />
      <Accessibility />
    </div>
  )
}

export default Nav
