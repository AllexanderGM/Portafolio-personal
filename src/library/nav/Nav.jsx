import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FolderKanban, Mail, UserRound } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import './nav.scss'

import Navbar from '@library/nav/components/organisms/Navbar'
import AccessibilityBar from '@library/accessibility/AccessibilityBar'
import { useGeneral } from '@hooks'

const Nav = ({ classPage }) => {
  const location = useLocation()
  const { route } = useGeneral()
  const [activeLink, setActiveLink] = useState(() => {
    const path = `${window.location.pathname}${window.location.hash}`
    if (window.location.pathname === route.home && !window.location.hash) {
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
    <>
      <nav className={`header ${classPage}`}>
        <article className='container'>
          <Navbar navItems={navItems} activeLink={activeLink} setActiveLink={setActiveLink} />
        </article>
      </nav>
      <AccessibilityBar />
    </>
  )
}

Nav.propTypes = {
  classPage: PropTypes.string.isRequired
}

export default Nav
