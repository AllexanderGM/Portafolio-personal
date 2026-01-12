import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import './cursor.scss'

const Cursor = ({ cursorActive, setCursorActive }) => {
  const [isCursorShow, setIsCursorShow] = useState(false)
  const [isClickableHovered, setIsClickableHovered] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorTwoPosition, setCursorTwoPosition] = useState({ x: 0, y: 0 })
  let location = useLocation()

  useEffect(() => {
    const clickableElements = document.querySelectorAll('.clickable')

    const handleElementMouseOver = () => {
      setIsClickableHovered(true)
    }

    const handleElementMouseOut = () => {
      setIsClickableHovered(false)
    }

    clickableElements.forEach(element => {
      element.addEventListener('mouseover', handleElementMouseOver)
      element.addEventListener('mouseout', handleElementMouseOut)

      return () => {
        element.removeEventListener('mouseover', handleElementMouseOver)
        element.removeEventListener('mouseout', handleElementMouseOut)
      }
    })
  }, [location])

  useEffect(() => {
    const handleMouseDown = () => {
      setCursorActive(true)
    }

    const handleMouseUp = () => {
      setCursorActive(false)
    }

    if (isClickableHovered) {
      setIsClickableHovered(false)
    }

    const handleLocationChange = () => {
      setIsClickableHovered(false)
    }

    const handleMouseMove = e => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      const windowWidth = globalThis.innerWidth
      const windowHeight = globalThis.innerHeight

      const mouseOutsideWindow = mouseX < 0 || mouseY < 0 || mouseX > windowWidth || mouseY > windowHeight

      if (!mouseOutsideWindow) {
        setIsCursorShow(true)
      }

      setCursorPosition({ x: mouseX, y: mouseY })

      setTimeout(() => {
        setCursorTwoPosition({ x: mouseX, y: mouseY })
      }, 40)
    }

    const handleMouseLeave = () => {
      setIsCursorShow(false)
    }

    globalThis.addEventListener('popstate', handleLocationChange)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      globalThis.addEventListener('popstate', handleLocationChange)
      document.removeEventListener('mousemove', handleMouseMove)
      document.addEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [location])

  const classNameCursor = `cursor ${cursorActive ? 'active' : ''} ${isClickableHovered ? 'pointer' : ''} ${
    isCursorShow ? '' : 'no-visible'
  }`.trim()
  const icon = `${isClickableHovered ? 'ellipse' : 'ellipse'}`

  return (
    <>
      <div className={classNameCursor} style={{ left: cursorPosition.x, top: cursorPosition.y }}>
        {/* <ion-icon name={icon}></ion-icon> */}
      </div>
      <div className={classNameCursor} style={{ left: cursorTwoPosition.x, top: cursorTwoPosition.y }}></div>
    </>
  )
}

Cursor.propTypes = {
  cursorActive: PropTypes.bool.isRequired,
  setCursorActive: PropTypes.func.isRequired
}

export default Cursor
