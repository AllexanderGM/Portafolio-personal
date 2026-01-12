import { useState, useRef, useEffect } from 'react'

/**
 * Hook custom para detectar si un elemento está en viewport
 * @param {Object} options - Opciones de IntersectionObserver
 * @returns {[React.Ref, boolean]} Ref para el elemento y boolean isIntersecting
 */
export const useIntersectionObserver = (options = {}) => {
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold, root, rootMargin }
    )

    const currentTarget = targetRef.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [threshold, root, rootMargin])

  return [targetRef, isIntersecting]
}

export default useIntersectionObserver
