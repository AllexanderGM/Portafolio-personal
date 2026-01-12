import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './splash.scss'

import logo_figure from '../../assets/icon/logo.svg'

const Splash = ({ onFinish }) => {
  const [stateClass, setStateClass] = useState('splash_screen-container')

  useEffect(() => {
    const timer_animation = setTimeout(() => {
      setStateClass('splash_screen-container off')
    }, 1390)

    const timer_splash = setTimeout(() => {
      onFinish()
    }, 1600)

    return () => {
      clearTimeout(timer_animation)
      clearTimeout(timer_splash)
    }
  }, [onFinish])

  return (
    <section className={stateClass}>
      <article className='splash_screen-animation'>
        <article className='logo_container'>
          <article className='logo_absolute'>
            <figure className='logo' id='rocket'>
              <img src={logo_figure} alt='Logo del splash' />
            </figure>
          </article>
        </article>
      </article>

      <p className='splash_screen-logo-text'>Jeisson Alexander</p>
    </section>
  )
}

Splash.propTypes = {
  onFinish: PropTypes.func.isRequired
}

export default Splash
