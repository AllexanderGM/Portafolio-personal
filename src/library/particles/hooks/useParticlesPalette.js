import { useEffect, useState } from 'react'
import { useGeneral } from '@hooks'

const resolveCssColor = (variable, fallback) => {
  if (globalThis.window === undefined) return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value || fallback
}

const useParticlesPalette = () => {
  const { theme } = useGeneral()
  const [palette, setPalette] = useState(() => ({
    particle: theme === 'dark' ? '#ffffff' : '#2f3238',
    link: theme === 'dark' ? '#c1c5cc' : '#2f3238'
  }))

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

  return palette
}

export default useParticlesPalette
