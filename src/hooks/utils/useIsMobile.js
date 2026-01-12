import { useWindowSize } from './useWindowSize.js'

/**
 * Hook custom para detectar si es mobile
 * @param {number} breakpoint - Ancho máximo para considerar mobile (default: 768px)
 * @returns {boolean} true si es mobile
 */
export const useIsMobile = (breakpoint = 768) => {
  const { width } = useWindowSize()
  return width < breakpoint
}

export default useIsMobile
