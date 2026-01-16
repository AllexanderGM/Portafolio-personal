import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

const Greeting = ({ greeting }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [text, setText] = useState('')
  const [loopIndex, setLoopIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const typingSpeed = greeting.timer ?? 90
  const typing = greeting.typing ?? null
  const prefix = typing?.prefix ?? ''
  const options = useMemo(() => {
    if (typing?.options?.length) return typing.options
    if (greeting.profession?.length) return greeting.profession
    return []
  }, [typing, greeting.profession])

  useEffect(() => {
    if (!options.length) return undefined

    const fullText = options[loopIndex % options.length]
    const isFullText = text === fullText
    const isEmptyText = text.length === 0

    if (!isDeleting && isFullText) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 900)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting && isEmptyText) {
      setIsDeleting(false)
      setLoopIndex(prevIndex => prevIndex + 1)
      return undefined
    }

    const timeout = setTimeout(
      () => {
        setText(prevText => {
          if (isDeleting) return fullText.slice(0, Math.max(0, prevText.length - 1))
          return fullText.slice(0, prevText.length + 1)
        })
      },
      isDeleting ? Math.max(40, typingSpeed / 2) : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, loopIndex, options, typingSpeed])

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

  const showDynamicLine = Boolean(prefix || options.length)

  return (
    <motion.div variants={scrollAnimation} custom={{ duration: 2 }} className='greeting'>
      {greeting.eyebrow && <span className='greeting_eyebrow'>{greeting.eyebrow}</span>}
      {greeting.greeting && <p className='greeting_title'>{greeting.greeting}</p>}
      {showDynamicLine && (
        <p className='greeting_dynamic'>
          {prefix && <span className='greeting_prefix'>{prefix}</span>}
          <span className={`greeting_word ${isBlinking ? 'is-caret-hidden' : ''}`}>{text}</span>
        </p>
      )}
    </motion.div>
  )
}

Greeting.propTypes = {
  greeting: PropTypes.object.isRequired
}

export default Greeting
