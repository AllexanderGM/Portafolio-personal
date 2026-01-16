import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import './loadingPage.scss'

const ANIMATION_TIMING = {
  ENTRANCE_DELAY: 20,
  EXIT_DELAY: 100,
  EXIT_DURATION: 250,
  TOTAL_DURATION: 350
}

const LoadingPage = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const timersRef = useRef([])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mostrar loading
    setIsVisible(true)
    setIsExiting(false)

    // Iniciar salida
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, ANIMATION_TIMING.EXIT_DELAY)

    // Finalizar
    const finishTimer = setTimeout(() => {
      onFinish()
      setIsVisible(false)
    }, ANIMATION_TIMING.TOTAL_DURATION)

    timersRef.current = [exitTimer, finishTimer]

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [pathname, onFinish])

  if (!isVisible) return null

  return (
    <section className={`loading-page ${isExiting ? 'exiting' : ''}`}>
      <div className='loading-page_content'>
        <div className='loading-page_spinner'>
          <div className='spinner-ring'></div>
          <div className='spinner-ring'></div>
          <div className='spinner-ring'></div>
        </div>
      </div>
    </section>
  )
}

LoadingPage.propTypes = {
  onFinish: PropTypes.func.isRequired
}

export default LoadingPage
