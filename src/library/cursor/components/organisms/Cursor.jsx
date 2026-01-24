import { useRef } from 'react'
import useCursorTracker from '../../hooks/useCursorTracker'

import './cursor.scss'

const Cursor = () => {
  const cursorRef = useRef(null)
  const { cursorActive, cursorEnabled, isCursorVisible, isClickableHovered } = useCursorTracker({ cursorRef })

  if (!cursorEnabled) return null

  const stateClasses = [cursorActive ? 'is-active' : '', isClickableHovered ? 'is-clickable' : '', isCursorVisible ? '' : 'is-hidden']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`app-cursor app-cursor__trail ${stateClasses}`.trim()}
      ref={cursorRef}
      aria-hidden='true'
    />
  )
}

export default Cursor
