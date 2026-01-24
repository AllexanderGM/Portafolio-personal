import { useCallback, useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 200

const useToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = document.documentElement.scrollTop > SCROLL_THRESHOLD
      setIsVisible(shouldShow)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    isVisible,
    handleClick
  }
}

export default useToTopButton
