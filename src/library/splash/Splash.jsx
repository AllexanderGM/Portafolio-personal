import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './splash.scss'

import logo_figure from '../../assets/icon/logo.svg'

const ANIMATION_TIMING = {
  LOGO_ENTRANCE: 400,
  TEXT_ENTRANCE: 600,
  HOLD_TIME: 800,
  EXIT_START: 1800,
  EXIT_DURATION: 500,
  TOTAL_DURATION: 2300
}

const Splash = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, ANIMATION_TIMING.EXIT_START)

    const finishTimer = setTimeout(() => {
      onFinish()
    }, ANIMATION_TIMING.TOTAL_DURATION)

    timersRef.current = [exitTimer, finishTimer]

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [onFinish])

  return (
    <section className={`splash ${isExiting ? 'exiting' : ''}`}>
      <div className='splash_content'>
        <div className='splash_logo-wrapper'>
          <figure className='splash_logo'>
            <img src={logo_figure} alt='Logo Jeisson Alexander' />
          </figure>
        </div>
        <h1 className='splash_name'>Jeisson Alexander</h1>
      </div>
    </section>
  )
}

Splash.propTypes = {
  onFinish: PropTypes.func.isRequired
}

export default Splash
