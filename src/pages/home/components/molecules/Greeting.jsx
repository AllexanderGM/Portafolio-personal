import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

const Greeting = ({ greeting }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [text, setText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const toRotate = greeting.profession
  const fullText = toRotate[0]

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(prevText => prevText + fullText[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      } else {
        clearInterval(interval)
        setIsBlinking(true)
      }
    }, greeting.timer)

    return () => clearInterval(interval)
  }, [currentIndex, fullText, greeting.timer])

  useEffect(() => {
    let blinkingInterval

    if (isBlinking) {
      blinkingInterval = setInterval(() => {
        setIsBlinking(false)
      }, 500)
    } else {
      blinkingInterval = setInterval(() => {
        setIsBlinking(true)
      }, 500)
    }

    return () => clearInterval(blinkingInterval)
  }, [isBlinking])

  return (
    <motion.h2 variants={scrollAnimation} custom={{ duration: 2 }}>
      {greeting.greeting}
      <br />
      <span className='txt-rotate' data-rotate={`${toRotate}`}>
        <span className={`wrap ${isBlinking}`}>{text}</span>
      </span>
    </motion.h2>
  )
}

Greeting.propTypes = {
  greeting: PropTypes.object.isRequired
}

export default Greeting
