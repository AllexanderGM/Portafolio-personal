import { useCallback, useEffect, useRef, useState } from 'react'

const useScrollButton = href => {
  const buttonRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimationEnd, setIsAnimationEnd] = useState(false)
  const [visibilityClass, setVisibilityClass] = useState('')

  const handleClick = useCallback(() => {
    const element = document.querySelector(href)

    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }, [href])

  const handleAnimationEnd = useCallback(() => {
    setIsAnimationEnd(true)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      globalThis.requestAnimationFrame(() => {
        if (globalThis.scrollY > 60) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
          setIsAnimationEnd(false)
        }
        ticking = false
      })

      ticking = true
    }

    const button = buttonRef.current

    globalThis.addEventListener('scroll', handleScroll, { passive: true })
    if (button) {
      button.addEventListener('animationend', handleAnimationEnd)
    }

    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
      if (button) {
        button.removeEventListener('animationend', handleAnimationEnd)
      }
    }
  }, [handleAnimationEnd])

  useEffect(() => {
    if (isVisible) {
      setVisibilityClass('')
      return
    }

    if (isAnimationEnd) {
      setVisibilityClass('is-hidden')
    } else {
      setVisibilityClass('is-fading')
    }
  }, [isVisible, isAnimationEnd])

  return {
    buttonRef,
    visibilityClass,
    handleClick
  }
}

export default useScrollButton
