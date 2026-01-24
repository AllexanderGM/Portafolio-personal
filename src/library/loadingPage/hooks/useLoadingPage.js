import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ANIMATION_TIMING = {
  EXIT_DELAY: 100,
  TOTAL_DURATION: 350
}

const useLoadingPage = onFinish => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const { pathname } = useLocation()
  const timersRef = useRef([])
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(true)
    setIsExiting(false)

    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, ANIMATION_TIMING.EXIT_DELAY)

    const finishTimer = setTimeout(() => {
      onFinishRef.current?.()
      setIsVisible(false)
    }, ANIMATION_TIMING.TOTAL_DURATION)

    timersRef.current = [exitTimer, finishTimer]

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [pathname])

  return {
    isVisible,
    isExiting
  }
}

export default useLoadingPage
