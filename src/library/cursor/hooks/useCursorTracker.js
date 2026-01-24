import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const CLICKABLE_SELECTOR = '.clickable'
const POINTER_MEDIA_QUERY = '(pointer: fine)'
const TRAIL_EASE = 0.2
const STOP_THRESHOLD = 0.5

const useCursorTracker = ({ cursorRef, clickableSelector = CLICKABLE_SELECTOR, trailEase = TRAIL_EASE } = {}) => {
  const location = useLocation()
  const animationFrameRef = useRef(null)
  const latestPositionRef = useRef({ x: 0, y: 0 })
  const trailPositionRef = useRef({ x: null, y: null })
  const isCursorVisibleRef = useRef(false)
  const [isCursorVisible, setIsCursorVisible] = useState(false)
  const [isClickableHovered, setIsClickableHovered] = useState(false)
  const [cursorActive, setCursorActive] = useState(false)
  const [cursorEnabled, setCursorEnabled] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return true
    }
    return window.matchMedia(POINTER_MEDIA_QUERY).matches
  })

  const setVisible = useCallback((visible) => {
    if (isCursorVisibleRef.current === visible) return
    isCursorVisibleRef.current = visible
    setIsCursorVisible(visible)
  }, [])

  const updateCursorPosition = useCallback((x, y) => {
    if (!cursorRef?.current) return
    cursorRef.current.style.left = `${x}px`
    cursorRef.current.style.top = `${y}px`
  }, [cursorRef])

  useEffect(() => {
    setIsClickableHovered(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined

    const mediaQuery = window.matchMedia(POINTER_MEDIA_QUERY)
    const handleChange = event => setCursorEnabled(event.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  useEffect(() => {
    if (!cursorEnabled) {
      setIsClickableHovered(false)
      setVisible(false)
      trailPositionRef.current = { x: null, y: null }
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return undefined
    }

    const handlePointerOver = event => {
      if (!(event.target instanceof Element)) return
      if (event.target.closest(clickableSelector)) {
        setIsClickableHovered(true)
      }
    }

    const handlePointerOut = event => {
      if (!(event.target instanceof Element)) return
      const clickable = event.target.closest(clickableSelector)
      if (!clickable) return
      if (event.relatedTarget instanceof Element && clickable.contains(event.relatedTarget)) return

      setIsClickableHovered(false)
    }

    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)

    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
    }
  }, [clickableSelector, cursorEnabled])

  useEffect(() => {
    if (!cursorEnabled) {
      setVisible(false)
      return undefined
    }

    const updateTrail = () => {
      animationFrameRef.current = null
      const { x, y } = latestPositionRef.current
      const current = trailPositionRef.current

      if (current.x === null || current.y === null) {
        trailPositionRef.current = { x, y }
        updateCursorPosition(x, y)
        return
      }

      const nextX = current.x + (x - current.x) * trailEase
      const nextY = current.y + (y - current.y) * trailEase
      trailPositionRef.current = { x: nextX, y: nextY }
      updateCursorPosition(nextX, nextY)

      const remaining = Math.abs(x - nextX) + Math.abs(y - nextY)
      if (remaining > STOP_THRESHOLD) {
        animationFrameRef.current = window.requestAnimationFrame(updateTrail)
      }
    }

    const scheduleTrailUpdate = () => {
      if (animationFrameRef.current) return
      animationFrameRef.current = window.requestAnimationFrame(updateTrail)
    }

    const handleMouseMove = e => {
      const { clientX, clientY } = e
      latestPositionRef.current = { x: clientX, y: clientY }
      if (trailPositionRef.current.x === null || trailPositionRef.current.y === null) {
        trailPositionRef.current = { x: clientX, y: clientY }
        updateCursorPosition(clientX, clientY)
      }
      const windowWidth = globalThis.innerWidth
      const windowHeight = globalThis.innerHeight
      const mouseOutsideWindow = clientX < 0 || clientY < 0 || clientX > windowWidth || clientY > windowHeight

      setVisible(!mouseOutsideWindow)
      scheduleTrailUpdate()
    }

    const handleMouseDown = () => {
      setCursorActive(true)
    }

    const handleMouseUp = () => {
      setCursorActive(false)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [cursorEnabled, setVisible, trailEase, updateCursorPosition])

  return {
    cursorActive,
    cursorEnabled,
    isCursorVisible,
    isClickableHovered
  }
}

export default useCursorTracker
