import { useEffect, useMemo, useState } from 'react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Particles from '@tsparticles/react'

import { useGeneral } from '@hooks'

import './particlesBackground.scss'

const resolveCssColor = (variable, fallback) => {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value || fallback
}

const ParticlesBackground = () => {
  const { theme, reduceMotion } = useGeneral()
  const [ready, setReady] = useState(false)
  const [palette, setPalette] = useState(() => ({
    particle: theme === 'dark' ? '#ffffff' : '#2f3238',
    link: theme === 'dark' ? '#c1c5cc' : '#2f3238'
  }))

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  useEffect(() => {
    const fallback = theme === 'dark' ? '#ffffff' : '#2f3238'
    const updatePalette = () => {
      setPalette({
        particle: resolveCssColor('--text-muted', fallback),
        link: resolveCssColor('--text-tertiary', fallback)
      })
    }

    const frame = globalThis.requestAnimationFrame ? requestAnimationFrame(updatePalette) : setTimeout(updatePalette, 0)

    return () => {
      if (globalThis.cancelAnimationFrame) cancelAnimationFrame(frame)
      else clearTimeout(frame)
    }
  }, [theme])

  const options = useMemo(() => {
    const particleColor = palette.particle
    const linkColor = palette.link

    return {
      fullScreen: { enable: false },
      fpsLimit: reduceMotion ? 30 : 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: !reduceMotion, mode: 'repulse' }
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
          enable: !reduceMotion,
          outModes: { default: 'bounce' },
          random: false,
          speed: reduceMotion ? 0.4 : 1,
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
  }, [palette.link, palette.particle, reduceMotion])

  if (!ready) return null

  return (
    <div className='particles-background' aria-hidden='true'>
      <Particles id='tsparticles' options={options} />
    </div>
  )
}

export default ParticlesBackground
