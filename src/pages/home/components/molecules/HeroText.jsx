import { useState, useEffect, useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'

import { getScrollAnimation } from '@library/animation'

import './heroText.scss'

// Parsea texto con *palabra* para resaltar con accent-primary
const parseHighlightedText = text => {
  if (!text) return null
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={index} className='hero-text_highlight'>
          {part.slice(1, -1)}
        </span>
      )
    }
    return part
  })
}

const HeroText = ({ hero }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const { eyebrow, name, role, description, typing } = hero

  // Typing animation state
  const [text, setText] = useState('')
  const [loopIndex, setLoopIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCaretVisible, setIsCaretVisible] = useState(true)

  const typingSpeed = typing?.timer ?? 90
  const prefix = typing?.prefix ?? ''
  const options = useMemo(() => typing?.options ?? [], [typing?.options])

  // Typing effect
  useEffect(() => {
    if (!options.length) return undefined

    const fullText = options[loopIndex % options.length]
    const isFullText = text === fullText
    const isEmptyText = text.length === 0

    if (!isDeleting && isFullText) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 1200)
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

  // Caret blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsCaretVisible(prev => !prev)
    }, 530)
    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <m.div variants={scrollAnimation} custom={{ duration: 2 }} className='hero-text'>
      {/* Eyebrow - Introduce al usuario */}
      {eyebrow && <span className='hero-text_eyebrow'>{eyebrow}</span>}

      {/* Nombre - El protagonista (H1) */}
      <h1 className='hero-text_name'>
        {name.map((line, index) => (
          <span key={index} className='hero-text_name-line'>
            {line}
          </span>
        ))}
      </h1>

      {/* Role - Subtítulo */}
      {role && <p className='hero-text_role'>{role}</p>}

      {/* Value proposition */}
      <div className='hero-text_value'>
        {description && <p className='hero-text_description'>{parseHighlightedText(description)}</p>}

        {/* Typing animation */}
        {(prefix || options.length > 0) && (
          <p className='hero-text_typing'>
            {prefix && <span className='hero-text_prefix'>{prefix} </span>}
            <span className={`hero-text_word ${!isCaretVisible ? 'caret-hidden' : ''}`}>{text}</span>
          </p>
        )}
      </div>
    </m.div>
  )
}

HeroText.propTypes = {
  hero: PropTypes.shape({
    eyebrow: PropTypes.string,
    name: PropTypes.arrayOf(PropTypes.string).isRequired,
    role: PropTypes.string,
    description: PropTypes.string,
    typing: PropTypes.shape({
      timer: PropTypes.number,
      prefix: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
}

export default HeroText
