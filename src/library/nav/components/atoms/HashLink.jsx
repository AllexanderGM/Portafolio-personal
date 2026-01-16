import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { HashLink as RouterHashLink } from 'react-router-hash-link'

const COLLAPSE_DELAY = 100
const CSS_CLASSES = {
  ACTIVE: 'active',
  EXPANDED: 'expanded',
  CLICKABLE: 'clickable'
}

const HashLink = ({ Icon, text, route, setActiveLink, activeLink }) => {
  const [isActive, setIsActive] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const collapseTimerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    setIsActive(activeLink === route)
  }, [activeLink, route])

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
      collapseTimerRef.current = null
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => setIsExpanded(true))
  }, [])

  const handleMouseLeave = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setIsExpanded(false))
    }, COLLAPSE_DELAY)
  }, [])

  const handleClick = useCallback(() => {
    setActiveLink(route)
  }, [setActiveLink, route])

  const className = [isActive && CSS_CLASSES.ACTIVE, isExpanded && CSS_CLASSES.EXPANDED, CSS_CLASSES.CLICKABLE].filter(Boolean).join(' ')

  return (
    <li className={className}>
      <RouterHashLink
        to={route}
        smooth
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}>
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
