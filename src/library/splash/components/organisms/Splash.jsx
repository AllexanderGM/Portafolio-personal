import PropTypes from 'prop-types'

import logo_figure from '../../../../assets/icon/logo.svg'
import useSplashTimer from '../../hooks/useSplashTimer'

import './splash.scss'

const Splash = ({ onFinish }) => {
  const { isExiting } = useSplashTimer(onFinish)

  return (
    <section className={`splash-screen ${isExiting ? 'is-exiting' : ''}`}>
      <div className='splash-screen__content'>
        <div className='splash-screen__logo-wrapper'>
          <figure className='splash-screen__logo'>
            <img src={logo_figure} alt='Logo Jeisson Alexander' />
          </figure>
        </div>
        <h1 className='splash-screen__name'>Jeisson Alexander</h1>
      </div>
    </section>
  )
}

Splash.propTypes = {
  onFinish: PropTypes.func.isRequired
}

export default Splash
