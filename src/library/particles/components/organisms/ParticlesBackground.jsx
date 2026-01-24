import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Particles as ParticlesCanvas } from '@tsparticles/react'

import useParticlesEngineReady from '../../hooks/useParticlesEngineReady'
import useParticlesPalette from '../../hooks/useParticlesPalette'

import './particlesBackground.scss'

const ParticlesBackground = ({ id = 'particles-background', className = '' }) => {
  const ready = useParticlesEngineReady()
  const palette = useParticlesPalette()

  const options = useMemo(() => {
    const particleColor = palette.particle
    const linkColor = palette.link

    return {
      fullScreen: { enable: false },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' }
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 }
        }
      },
      particles: {
        color: { value: particleColor },
        links: {
          color: linkColor,
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: { enable: true },
          value: 80
        },
        opacity: { value: 0.5 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 5 } }
      },
      detectRetina: true
    }
  }, [palette.link, palette.particle])

  if (!ready) return null

  const rootClassName = ['particles-background', className].filter(Boolean).join(' ')

  return (
    <div className={rootClassName} aria-hidden='true'>
      <ParticlesCanvas id={id} options={options} />
    </div>
  )
}

ParticlesBackground.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string
}

export default ParticlesBackground
