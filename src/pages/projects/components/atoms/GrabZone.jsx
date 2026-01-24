import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

const CONSTANTS = {
  assetPath: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729'
}

const ASSETS = {
  head: `${CONSTANTS.assetPath}/head.svg`,
  waiting: `${CONSTANTS.assetPath}/hand.svg`,
  stalking: `${CONSTANTS.assetPath}/hand-waiting.svg`,
  grabbing: `${CONSTANTS.assetPath}/hand.svg`,
  grabbed: `${CONSTANTS.assetPath}/hand-with-cursor.svg`,
  shaka: `${CONSTANTS.assetPath}/hand-surfs-up.svg`
}

Object.keys(ASSETS).forEach(key => {
  const img = new Image()
  img.src = ASSETS[key]
})

const useHover = () => {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  const enter = () => setHovered(true)
  const leave = () => setHovered(false)

  useEffect(() => {
    ref.current.addEventListener('mouseenter', enter)
    ref.current.addEventListener('mouseleave', leave)
  }, [ref])

  return [ref, hovered]
}

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY })
    globalThis.addEventListener('mousemove', setFromEvent)

    return () => {
      globalThis.removeEventListener('mousemove', setFromEvent)
    }
  }, [])

  return position
}

const usePosition = () => {
  const ref = useRef()
  const [position, setPosition] = useState({})

  const updatePosition = () => {
    if (ref.current) {
      setPosition(ref.current.getBoundingClientRect())
    }
  }

  useLayoutEffect(() => {
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [])

  return [ref, position]
}

const Grabber = ({ state, gameOver, extended, onCursorGrabbed }) => {
  const mousePos = useMousePosition()
  const [ref, position] = usePosition()

  // Calculate rotation of armWrapper
  const x = position.left + position.width * 0.5
  const y = position.top + position.height * 0.5
  const angle = gameOver ? 0 : Math.atan2(mousePos.x - x, -(mousePos.y - y)) * (180 / Math.PI)

  // Ensure value is within acceptable range (-75 to 75)
  const rotation = Math.min(Math.max(Number.parseInt(angle, 10), -79), 79)

  const grabberClass = `grabber grabber--${state} ${extended && 'grabber--extended'}`
  const wrapperStyle = { transform: `rotate(${rotation}deg)` }

  let handImageSrc = ASSETS[state]

  return (
    <div className={grabberClass}>
      <div className='grabber__body'></div>
      <img className='grabber__face' src={ASSETS.head} alt='Grabber face' />
      <div className='grabber__arm-wrapper' ref={ref} style={wrapperStyle}>
        <div className='grabber__arm'>
          <img className='grabber__hand' src={handImageSrc} alt='Grabber hand' onMouseEnter={onCursorGrabbed} />
        </div>
      </div>
    </div>
  )
}

Grabber.propTypes = {
  state: PropTypes.string.isRequired,
  gameOver: PropTypes.bool.isRequired,
  extended: PropTypes.bool.isRequired,
  onCursorGrabbed: PropTypes.func.isRequired
}

const GrabZone = ({ cursorGrabbed, gameOver, onCursorGrabbed }) => {
  const [outerRef, outerHovered] = useHover()
  const [innerRef, innerHovered] = useHover()
  const [isExtended, setIsExtended] = useState(false)

  let state = 'waiting'
  if (outerHovered) {
    state = 'stalking'
  }
  if (innerHovered) {
    state = 'grabbing'
  }
  if (cursorGrabbed) {
    state = 'grabbed'
  }
  if (gameOver) {
    state = 'shaka'
  }

  useEffect(() => {
    let timer
    if (state === 'grabbing') {
      timer = setTimeout(() => {
        setIsExtended(true)
        timer = null
      }, 2000)
    }
    return () => {
      setIsExtended(false)
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [state])

  return (
    <div className='grab-zone' ref={outerRef}>
      <div className='grab-zone__debug'>
        <strong>Debug info:</strong>
        <p>Current state: {state}</p>
        <p>Extended arm: {isExtended ? 'Yes' : 'No'}</p>
      </div>
      <div className='grab-zone__danger' ref={innerRef}>
        <Grabber state={state} gameOver={gameOver} extended={isExtended} onCursorGrabbed={onCursorGrabbed} />
      </div>
    </div>
  )
}

GrabZone.propTypes = {
  cursorGrabbed: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  onCursorGrabbed: PropTypes.func.isRequired
}

export default GrabZone
