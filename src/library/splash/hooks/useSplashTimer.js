import { useEffect, useRef, useState } from 'react'

const ANIMATION_TIMING = {
  EXIT_START: 1800,
  TOTAL_DURATION: 2300
}

const useSplashTimer = onFinish => {
  const [isExiting, setIsExiting] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, ANIMATION_TIMING.EXIT_START)

    const finishTimer = setTimeout(() => {
      onFinish()
    }, ANIMATION_TIMING.TOTAL_DURATION)

    timersRef.current = [exitTimer, finishTimer]

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [onFinish])

  return { isExiting }
}

export default useSplashTimer
