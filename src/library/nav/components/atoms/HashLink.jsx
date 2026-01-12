import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { HashLink as RouterHashLink } from 'react-router-hash-link'

const HashLink = ({ Icon, text, route, setActiveLink, activeLink }) => {
  const [classState, setClassState] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const collapseTimerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (activeLink === route) {
      setClassState('active')
    } else {
      setClassState('')
    }
  }, [activeLink, route])

  const handleMouseEnter = useCallback(() => {
    // Cancelar cualquier timer de colapso pendiente
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
      collapseTimerRef.current = null
    }

    // Usar requestAnimationFrame para sincronizar con el browser
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      setIsExpanded(true)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Mantener expandido por un tiempo antes de colapsar
    collapseTimerRef.current = setTimeout(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        setIsExpanded(false)
      })
    }, 100)
  }, [])

  const onUpdateActiveLink = useCallback(() => {
    setActiveLink(route)
  }, [setActiveLink, route])

  // Cleanup
  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const liClasses = `${classState} ${isExpanded ? 'expanded' : ''} clickable`

  return (
    <li
      onClick={onUpdateActiveLink}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={liClasses}
    >
      <RouterHashLink to={route} smooth>
        <Icon className='nav-icon' aria-hidden='true' />
        <span className='nav-text'>{text}</span>
      </RouterHashLink>
    </li>
  )
}

HashLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  setActiveLink: PropTypes.func.isRequired,
  activeLink: PropTypes.string.isRequired
}

export default HashLink
