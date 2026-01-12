import { createContext, useState, useMemo, useCallback, useEffect } from 'react'
import generalData from '../_data/general.json'

// Constantes
const FONT_SCALE_STEPS = [0.9, 1, 1.1, 1.2]
const CONTRAST_MODES = ['normal', 'low', 'high']

// Crear contexto
export const GeneralContext = createContext(null)

/**
 * Provider General que maneja:
 * - Información social (links, email, etc.)
 * - Rutas de navegación
 * - Estado del cursor
 * - Tema (light/dark)
 * - Estado de primera carga
 */
export const GeneralProvider = ({ children }) => {
  // Datos estáticos desde JSON
  const { social, route } = generalData

  // Estados de la aplicación
  const [cursorActive, setCursorActive] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Intentar obtener el tema guardado del localStorage
    const savedTheme = localStorage.getItem('portfolio-theme')
    return savedTheme || 'dark'
  })
  const [fontScale, setFontScale] = useState(() => {
    const savedScale = Number(localStorage.getItem('portfolio-font-scale'))
    return FONT_SCALE_STEPS.includes(savedScale) ? savedScale : 1
  })
  const [contrastMode, setContrastModeState] = useState(() => {
    const savedMode = localStorage.getItem('portfolio-contrast')
    return CONTRAST_MODES.includes(savedMode) ? savedMode : 'normal'
  })
  const [grayscaleMode, setGrayscaleMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-grayscale')
    return saved === 'true'
  })
  const [underlineLinks, setUnderlineLinks] = useState(() => {
    const saved = localStorage.getItem('portfolio-underline-links')
    return saved === 'true'
  })
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('portfolio-reduce-motion')
    if (saved !== null) {
      return saved === 'true'
    }
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [firstLoad, setFirstLoad] = useState(true)

  // Métodos del cursor
  const activeCursor = useCallback(() => {
    setCursorActive(true)
  }, [])

  const inactiveCursor = useCallback(() => {
    setCursorActive(false)
  }, [])

  // Métodos del tema
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('portfolio-theme', newTheme)
      return newTheme
    })
  }, [])

  const setThemeMode = useCallback(mode => {
    if (mode !== 'light' && mode !== 'dark') {
      console.warn('Tema inválido. Debe ser "light" o "dark"')
      return
    }
    setTheme(mode)
    localStorage.setItem('portfolio-theme', mode)
  }, [])

  const setFontScaleValue = useCallback(scale => {
    if (!FONT_SCALE_STEPS.includes(scale)) {
      console.warn('Tamaño inválido. Debe estar en la lista de tamaños permitidos')
      return
    }
    setFontScale(scale)
    localStorage.setItem('portfolio-font-scale', String(scale))
  }, [])

  const increaseFontScale = useCallback(() => {
    setFontScale(prevScale => {
      const currentIndex = FONT_SCALE_STEPS.indexOf(prevScale)
      const nextScale = FONT_SCALE_STEPS[Math.min(currentIndex + 1, FONT_SCALE_STEPS.length - 1)]
      localStorage.setItem('portfolio-font-scale', String(nextScale))
      return nextScale
    })
  }, [])

  const decreaseFontScale = useCallback(() => {
    setFontScale(prevScale => {
      const currentIndex = FONT_SCALE_STEPS.indexOf(prevScale)
      const nextScale = FONT_SCALE_STEPS[Math.max(currentIndex - 1, 0)]
      localStorage.setItem('portfolio-font-scale', String(nextScale))
      return nextScale
    })
  }, [])

  const setContrastMode = useCallback(mode => {
    if (!CONTRAST_MODES.includes(mode)) {
      console.warn('Contraste inválido. Debe ser "normal", "low" o "high"')
      return
    }
    setContrastModeState(mode)
    localStorage.setItem('portfolio-contrast', mode)
  }, [])

  const toggleGrayscaleMode = useCallback(() => {
    setGrayscaleMode(prev => {
      const next = !prev
      localStorage.setItem('portfolio-grayscale', String(next))
      return next
    })
  }, [])

  const toggleUnderlineLinks = useCallback(() => {
    setUnderlineLinks(prev => {
      const next = !prev
      localStorage.setItem('portfolio-underline-links', String(next))
      return next
    })
  }, [])

  const toggleReduceMotion = useCallback(() => {
    setReduceMotion(prev => {
      const next = !prev
      localStorage.setItem('portfolio-reduce-motion', String(next))
      return next
    })
  }, [])

  const resetAccessibility = useCallback(() => {
    setFontScale(1)
    setContrastModeState('normal')
    setGrayscaleMode(false)
    setUnderlineLinks(false)
    setReduceMotion(false)
    localStorage.setItem('portfolio-font-scale', '1')
    localStorage.setItem('portfolio-contrast', 'normal')
    localStorage.setItem('portfolio-grayscale', 'false')
    localStorage.setItem('portfolio-underline-links', 'false')
    localStorage.setItem('portfolio-reduce-motion', 'false')
  }, [])

  // Métodos de primera carga
  const finishFirstLoad = useCallback(() => {
    setFirstLoad(false)
  }, [])

  // Efecto para aplicar el tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale))
  }, [fontScale])

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', contrastMode)
  }, [contrastMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-grayscale', grayscaleMode ? 'on' : 'off')
  }, [grayscaleMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-links', underlineLinks ? 'underline' : 'normal')
  }, [underlineLinks])

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', reduceMotion ? 'reduced' : 'normal')
  }, [reduceMotion])

  // Efecto para aplicar tema inicial (dark por defecto)
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (!savedTheme) {
      // Si no hay tema guardado, establecer dark por defecto
      setTheme('dark')
      localStorage.setItem('portfolio-theme', 'dark')
    }
  }, [])

  // Valor del contexto con useMemo para optimización
  const value = useMemo(
    () => ({
      // Datos estáticos
      social,
      route,

      // Estado y métodos del cursor
      cursorActive,
      setCursorActive,
      activeCursor,
      inactiveCursor,

      // Estado y métodos del tema
      theme,
      toggleTheme,
      setThemeMode,
      isDark: theme === 'dark',
      isLight: theme === 'light',

      // Estado y métodos de accesibilidad
      fontScale,
      setFontScale: setFontScaleValue,
      increaseFontScale,
      decreaseFontScale,
      contrastMode,
      setContrastMode,
      grayscaleMode,
      toggleGrayscaleMode,
      underlineLinks,
      toggleUnderlineLinks,
      reduceMotion,
      toggleReduceMotion,
      resetAccessibility,

      // Estado y métodos de primera carga
      firstLoad,
      finishFirstLoad
    }),
    [
      social,
      route,
      cursorActive,
      activeCursor,
      inactiveCursor,
      theme,
      toggleTheme,
      setThemeMode,
      fontScale,
      setFontScaleValue,
      increaseFontScale,
      decreaseFontScale,
      contrastMode,
      setContrastMode,
      grayscaleMode,
      toggleGrayscaleMode,
      underlineLinks,
      toggleUnderlineLinks,
      reduceMotion,
      toggleReduceMotion,
      resetAccessibility,
      firstLoad,
      finishFirstLoad
    ]
  )

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
}

// Exportar constantes por si se necesitan externamente
export { FONT_SCALE_STEPS, CONTRAST_MODES }
